import { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async (query: any) => {
  const { page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const users = await prisma.user.findMany({
    skip,
    take: Number(limit),
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

  const total = await prisma.user.count();

  return {
    data: users,
    metaData: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
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

const getAdminStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const [
      totalUsers,
      activeUsers,
      bannedUsers,
      sellers,
      customer,

      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,

      totalMedicines,
      lowStockMedicines,
      outOfStockMedicines,

      totalCategories,
      emptyCategories,
    ] = await Promise.all([
      tx.user.count(),
      tx.user.count({ where: { status: UserStatus.ACTIVE } }),
      tx.user.count({ where: { status: UserStatus.BANNED } }),
      tx.user.count({ where: { role: Role.SELLER } }),
      tx.user.count({ where: { role: Role.CUSTOMER } }),

      tx.order.count(),
      tx.order.count({ where: { status: "PROCESSING" } }),
      tx.order.count({ where: { status: "DELIVERED" } }),
      tx.order.count({ where: { status: "CANCELLED" } }),

      tx.medicine.count(),
      tx.medicine.count({
        where: {
          stock: {
            gt: 0,
            lte: 10,
          },
        },
      }),
      tx.medicine.count({
        where: {
          stock: {
            lte: 0,
          },
        },
      }),

      tx.category.count(),
      tx.category.count({
        where: {
          medicines: {
            none: {},
          },
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        banned: bannedUsers,
        sellers,
        customer,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders,
      },
      medicines: {
        total: totalMedicines,
        lowStock: lowStockMedicines,
        outOfStock: outOfStockMedicines,
      },
      categories: {
        total: totalCategories,
        empty: emptyCategories,
      },
    };
  });
};

export const UserService = {
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  updateUserStatus,
  getAdminStats,
};
