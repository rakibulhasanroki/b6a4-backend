import { Router } from "express";
import { roleAuth, userAuth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { CategoryController } from "./category.controller";

const router: Router = Router();

router.get("/categories", CategoryController.getAllCategories);

// Admin can create,update and delete category
router.post(
  "/categories",
  userAuth,
  roleAuth(Role.ADMIN),
  CategoryController.createCategory,
);

router.patch(
  "/categories/:categoryId",
  userAuth,
  roleAuth(Role.ADMIN),
  CategoryController.updateCategory,
);

router.delete(
  "/categories/:categoryId",
  userAuth,
  roleAuth(Role.ADMIN),
  CategoryController.deleteCategory,
);

export const CategoryRoutes = router;
