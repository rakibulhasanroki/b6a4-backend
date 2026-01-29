import { Router } from "express";
import authRouter from "./auth.route";
import { categoryRoutes } from "../modules/category/category.route";
import { MedicineRoutes } from "../modules/medicine/medicine.route";
import { orderRoutes } from "../modules/order/order.route";

const router: Router = Router();

router.use(authRouter);

router.use(categoryRoutes);
router.use(MedicineRoutes);
router.use(orderRoutes);

export default router;
