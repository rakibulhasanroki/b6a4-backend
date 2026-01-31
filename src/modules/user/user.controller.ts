import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;

    const result = await UserService.getMyProfile(userId);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;

    const result = await UserService.updateMyProfile(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const result = await UserService.updateUserStatus(userId as string, status);

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateUserStatus,
};
