import { Router } from "express";
import { UserController } from "./user.controller";
import { roleAuth, userAuth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router: Router = Router();
router.get(
  "/users",
  userAuth,
  roleAuth(Role.ADMIN),
  UserController.getAllUsers,
);

router.get("/user/me", userAuth, UserController.getMyProfile);
router.patch(
  "/user/me",
  userAuth,
  roleAuth(Role.ADMIN, Role.CUSTOMER, Role.SELLER),
  UserController.updateMyProfile,
);

export const UserRoutes = router;
