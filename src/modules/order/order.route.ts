import { Router } from "express";
import { OrderController } from "./order.controller";
import { roleAuth, userAuth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { checkUserStatus } from "../../middleware/checkUserStatus";

const router: Router = Router();
// seller
router.get(
  "/seller/orders",
  userAuth,
  checkUserStatus,
  roleAuth(Role.SELLER),
  OrderController.getSellerOrders,
);
// customer
router.get(
  "/orders",
  userAuth,
  checkUserStatus,
  roleAuth(Role.ADMIN, Role.CUSTOMER),
  OrderController.getOrders,
);
router.get(
  "/orders/:id",
  userAuth,
  checkUserStatus,
  roleAuth(Role.CUSTOMER, Role.ADMIN),
  OrderController.getOrderById,
);

// customer
router.post(
  "/orders",
  userAuth,
  checkUserStatus,
  roleAuth(Role.CUSTOMER),
  OrderController.createOrder,
);

router.patch(
  "/orders/:id",
  userAuth,
  checkUserStatus,
  roleAuth(Role.CUSTOMER, Role.SELLER),
  OrderController.updateOrderStatus,
);

export const OrderRoutes = router;
