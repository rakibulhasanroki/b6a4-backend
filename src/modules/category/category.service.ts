import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  if (!name) throw new Error("Category name is required");
  const existCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (existCategory) {
    throw new Error("Category already exists");
  }
  const category = prisma.category.create({
    data: {
      name,
    },
  });

  return category;
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const updateCategory = async (categoryId: string, name: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id: categoryId },
    data: { name },
  });
};

const deleteCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      medicines: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // if medicine exist then do not delete this category
  if (category.medicines.length > 0) {
    throw new Error("Cannot delete category that contains medicines");
  }

  return prisma.category.delete({
    where: { id: categoryId },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
