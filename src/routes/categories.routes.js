import express from "express";
import {
  createCategories,
  deleteCategory,
  getAllCategories,
  getCategoriesById,
  updateCategory,
} from "../controllers/categories.controllers.js";

const router = express.Router();

router.post("/", createCategories);
router.get("/", getAllCategories);
router.get("/:category_id", getCategoriesById);
router.put("/:category_id", updateCategory);
router.delete("/:category_id", deleteCategory);

export default router;
