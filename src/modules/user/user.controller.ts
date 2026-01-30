import { Request, Response } from "express";
import { UserService } from "./user.service";

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

export const UserController = {
  getMyProfile,
};
