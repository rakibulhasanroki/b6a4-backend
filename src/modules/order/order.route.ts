import { Router } from "express";
import { OrderController } from "./order.controller";
import { roleAuth, userAuth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router: Router = Router();

router.post(
  "/orders",
  userAuth,
  roleAuth(Role.CUSTOMER),
  OrderController.createOrder,
);
router.get(
  "/orders",
  userAuth,
  roleAuth(Role.CUSTOMER),
  OrderController.getMyOrders,
);
router.get(
  "/orders/:id",
  userAuth,
  roleAuth(Role.CUSTOMER),
  OrderController.getOrderById,
);

export const orderRoutes = router;
