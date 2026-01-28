import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const category = await CategoryService.createCategory(name);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all category" });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
};
