import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(error);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await CategoryService.getAllCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await CategoryService.updateCategory(
      categoryId as string,
      name,
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;

    await CategoryService.deleteCategory(categoryId as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
