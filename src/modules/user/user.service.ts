import { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phoneNumber: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateMyProfile = async (
  userId: string,
  payload: { name?: string; phoneNumber?: string },
) => {
  const { name, phoneNumber } = payload;
  if (name === undefined && phoneNumber === undefined) {
    throw new Error(
      "At least one field (name or phoneNumber) is required to update",
    );
  }
  const updateData: any = {};
  if (name !== undefined) {
    updateData.name = name;
  }

  if (phoneNumber !== undefined) {
    updateData.phoneNumber = phoneNumber;
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phoneNumber: true,
    },
  });

  return updatedUser;
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // admin can not banned admin
  if (user.role === Role.ADMIN && status === UserStatus.BANNED) {
    throw new Error("Admin user cannot be banned");
  }
  if (user.status === status) {
    throw new Error(`User is already ${status.toLowerCase()}`);
  }

  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
};

export const UserService = {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateUserStatus,
};
