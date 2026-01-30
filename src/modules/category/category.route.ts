import { Router } from "express";
import { roleAuth, userAuth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { CategoryController } from "./category.controller";

const router: Router = Router();

router.get("/categories", CategoryController.getAllCategories);

// Admin can create category only
router.post(
  "/categories",
  userAuth,
  roleAuth(Role.ADMIN),
  CategoryController.createCategory,
);

export const CategoryRoutes = router;
