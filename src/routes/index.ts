import { Router } from "express";
import authRouter from "./auth.route";
import { categoryRoutes } from "../modules/category/category.route";
import { MedicineRoutes } from "../modules/medicine/medicine.route";

const router: Router = Router();

router.use(authRouter);

router.use("/categories", categoryRoutes);
router.use(MedicineRoutes);

export default router;
