import { NextFunction, Request, Response } from "express";
import { UserStatus, Role } from "../../generated/prisma/enums";

export const checkUserStatus = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  if (user.role !== Role.ADMIN && user.status === UserStatus.BANNED) {
    return res.status(403).json({
      success: false,
      message: "Your account has been banned. Please contact support.",
    });
  }

  next();
};
