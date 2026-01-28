import { Router } from "express";
import authRouter from "./auth.route";
import { categoryRoutes } from "../modules/category/category.route";

const router: Router = Router();

router.use(authRouter);

router.use("/categories", categoryRoutes);

export default router;
