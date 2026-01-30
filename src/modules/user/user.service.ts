import { prisma } from "../../lib/prisma";

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

export const UserService = {
  getMyProfile,
  updateMyProfile,
};
