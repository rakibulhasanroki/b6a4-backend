import { Router } from "express";
import { UserController } from "./user.controller";
import { userAuth } from "../../middleware/auth";

const router: Router = Router();

router.get("/user/me", userAuth, UserController.getMyProfile);

export const UserRoutes = router;
