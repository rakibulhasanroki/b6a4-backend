import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      email: string;
      role: Role;
      status: UserStatus;
    }

    interface Request {
      user?: User;
    }
  }
}

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });

    if (!session?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!currentUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = currentUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication failed" });
  }
}

export function roleAuth(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
}
