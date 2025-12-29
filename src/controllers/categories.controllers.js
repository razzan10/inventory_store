import prisma from "../prisma.js";

export const createCategories = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "Category name required!." });
    }
    const category = await prisma.categories.create({
      data: { category_name, description },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { category_id: "asc" },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoriesById = async (req, res) => {
  try {
    const id = Number(req.params.category_id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category id." });
    }

    const category = await prisma.categories.findUnique({
      where: { category_id: id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.category_id);
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "Category name required." });
    }

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category id." });
    }

    const category = await prisma.categories.update({
      where: { category_id: id },
      data: { category_name },
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.category_id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category id." });
    }

    await prisma.categories.delete({
      where: { category_id: id },
    });

    res.json({ message: "Success deleted category" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Category not found." });
    }
    return res.status(500).json({ message: error.message });
  }
};
