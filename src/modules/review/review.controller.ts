import { Request, Response, NextFunction } from "express";
import { ReviewService } from "./review.service";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user!;
    const { medicineId, rating, comment } = req.body;

    const review = await ReviewService.createReview(
      user.id,
      medicineId,
      rating,
      comment,
    );

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewsByMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { medicineId } = req.params;

    const reviews = await ReviewService.getReviewsByMedicine(
      medicineId as string,
    );

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  createReview,
  getReviewsByMedicine,
};
