import prisma from "../prisma.js";

export const createItems = async (req, res) => {
  try {
    const { item_name, purchase_price, selling_price, stock } = req.body;

    if (!item_name || !purchase_price || !selling_price || !stock) {
      return res.status(400).json({ message: "Fill all requirement!." });
    }

    const products = await prisma.items.create({
      data: { item_name, purchase_price, selling_price, stock },
    });

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const products = await prisma.items.findMany({
      orderBy: { category },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const id = Number(req.params.item_id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid items id!." });
    }

    const products = await prisma.items.findUnique({
      where: { item_id: id },
    });

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItems = async (req, res) => {
  try {
    const id = Number(req.params.item_id);
    const { item_name, purchase_price, selling_price, stock } = req.body;

    if (!item_name || !purchase_price || !selling_price || !stock) {
      return res.status(400).json({ message: "Fill requirement!." });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Items id!." });
    }

    const products = await prisma.items.update({
      where: { item_id: id },
      data: { item_name, purchase_price, selling_price, stock },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const id = Number(req.params.item_id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid items id" });
    }

    const products = await prisma.items.delete({
      where: { item_id: id },
    });

    res.json({ message: "Success delete products", data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
