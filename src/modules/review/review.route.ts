import express, { Router } from "express";
import { ReviewController } from "./review.controller";

import { Role } from "../../../generated/prisma/enums";
import { roleAuth, userAuth } from "../../middleware/auth";
import { checkUserStatus } from "../../middleware/checkUserStatus";

const router: Router = express.Router();

// Customer only
router.post(
  "/reviews",
  userAuth,
  checkUserStatus,
  roleAuth(Role.CUSTOMER),
  ReviewController.createReview,
);

// Public
router.get("/reviews/:medicineId", ReviewController.getReviewsByMedicine);

export const ReviewRoutes = router;
