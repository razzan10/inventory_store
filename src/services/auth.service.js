import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export const registerUser = async ({ name, email, password, role }) => {
  const hashed = await bcrypt.hash(password, 10);

  return prisma.users.create({
    data: {
      name,
      email,
      password: hashed,
      role,
    },
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("USER_NOT_FOUND");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("WRONG_PASSWORD");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};
