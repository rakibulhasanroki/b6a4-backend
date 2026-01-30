import { Router } from "express";
import { OrderController } from "./order.controller";
import { roleAuth, userAuth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router: Router = Router();
// seller
router.get(
  "/seller/orders",
  userAuth,
  roleAuth(Role.SELLER),
  OrderController.getSellerOrders,
);
// customer
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

// customer
router.post(
  "/orders",
  userAuth,
  roleAuth(Role.CUSTOMER),
  OrderController.createOrder,
);

router.patch(
  "/seller/orders/:id",
  userAuth,
  roleAuth(Role.CUSTOMER, Role.SELLER),
  OrderController.updateOrderStatus,
);

export const OrderRoutes = router;
