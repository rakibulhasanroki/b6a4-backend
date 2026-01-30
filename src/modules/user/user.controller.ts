import { Request, Response } from "express";
import { UserService } from "./user.service";
import { prisma } from "../../lib/prisma";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const result = await UserService.getMyProfile(userId);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const updateMyProfile = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await UserService.updateMyProfile(userId, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
};

export const UserController = {
  getMyProfile,
  updateMyProfile,
};
