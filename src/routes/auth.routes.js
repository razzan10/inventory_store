import express from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { auth } from "../middleware/auth.middleware.js";
import { role } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/owner-only", auth, role(["OWNER"]), (req, res) => {
  res.json({ message: "halo owner 👑" });
});

export default router;
