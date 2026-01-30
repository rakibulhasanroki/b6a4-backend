import { Router } from "express";
import AuthRouter from "./auth.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { MedicineRoutes } from "../modules/medicine/medicine.route";
import { OrderRoutes } from "../modules/order/order.route";
import { UserRoutes } from "../modules/user/user.route";

const router: Router = Router();

router.use(AuthRouter);
router.use(UserRoutes);
router.use(CategoryRoutes);
router.use(MedicineRoutes);
router.use(OrderRoutes);

export default router;
