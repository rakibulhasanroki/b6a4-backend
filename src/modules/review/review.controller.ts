import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add review",
    });
  }
};

const getReviewsByMedicine = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;

    const reviews = await ReviewService.getReviewsByMedicine(
      medicineId as string,
    );

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch reviews",
    });
  }
};

export const ReviewController = {
  createReview,
  getReviewsByMedicine,
};
