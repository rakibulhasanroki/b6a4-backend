import { OrderStatus, Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

interface OrderItemInput {
  medicineId: string;
  quantity: number;
}

const createOrder = async (
  customerId: string,
  shippingAddress: string,
  orderItems: OrderItemInput[],
) => {
  if (!orderItems || orderItems.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const medicineIds = orderItems.map((item) => item.medicineId);

  const medicines = await prisma.medicine.findMany({
    where: { id: { in: medicineIds } },
  });

  // Validate all medicines exist
  if (medicines.length !== orderItems.length) {
    throw new Error("One or more medicines not found");
  }

  const medicineItems = orderItems.map((item) => {
    const medicine = medicines.find((m) => m.id === item.medicineId)!;

    if (medicine.stock < item.quantity) {
      throw new Error(`Not enough stock for ${medicine.name}`);
    }

    return {
      ...item,
      price: medicine.price,
      sellerId: medicine.sellerId,
    };
  });

  // Grouping order for seller
  const sellerItems: Record<string, typeof medicineItems> = {};
  for (const item of medicineItems) {
    if (!sellerItems[item.sellerId]) {
      sellerItems[item.sellerId] = [];
    }
    sellerItems[item.sellerId]?.push(item);
  }
  // Create multiple order based on seller
  const orders = await prisma.$transaction(async (tx) => {
    const sellerOrders = [];
    for (const sellerId in sellerItems) {
      const itemsData = sellerItems[sellerId]!;
      let totalAmount = 0;
      const orderItemsData = itemsData?.map((item) => {
        totalAmount += item.price * item.quantity;
        return {
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.price,
        };
      });

      const order = await tx.order.create({
        data: {
          customerId,
          shippingAddress,
          totalAmount,
          orderItems: {
            create: orderItemsData,
          },
        },
        include: {
          orderItems: true,
        },
      });

      for (const item of itemsData) {
        await tx.medicine.update({
          where: {
            id: item.medicineId,
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }
      sellerOrders.push(order);
    }

    return sellerOrders;
  });

  return orders;
};

const getOrders = async (
  userId: string,
  role: Role,
  page: number,
  limit: number,
) => {
  const orderFilter = role === Role.ADMIN ? {} : { customerId: userId };
  const skip = (Number(page) - 1) * Number(limit);

  const result = await prisma.order.findMany({
    skip,
    take: Number(limit),
    where: orderFilter,
    orderBy: { createdAt: "desc" },
    include: {
      customer: {
        select: {
          name: true,
          phoneNumber: true,
          email: true,
        },
      },
      orderItems: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              seller: {
                select: {
                  id: true,
                  name: true,
                  phoneNumber: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const total = await prisma.order.count({
    where: orderFilter,
  });

  return {
    data: result,
    metaData: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getOrderById = async (orderId: string, customerId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      orderItems: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              image: true,
              price: true,
              seller: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

const getSellerOrders = async (
  sellerId: string,
  page: number,
  limit: number,
) => {
  const skip = (Number(page) - 1) * Number(limit);
  const orders = await prisma.order.findMany({
    skip,
    take: Number(limit),
    where: {
      orderItems: {
        some: {
          medicine: {
            sellerId: sellerId,
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    include: {
      customer: {
        select: { id: true, name: true, email: true, phoneNumber: true },
      },
      orderItems: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });
  const total = await prisma.order.count({
    where: {
      orderItems: {
        some: {
          medicine: {
            sellerId: sellerId,
          },
        },
      },
    },
  });
  return {
    data: orders,
    metaData: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const updateOrderStatus = async (
  orderId: string,
  userId: string,
  role: Role,
  status: OrderStatus,
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          medicine: true,
        },
      },
    },
  });

  if (!order) throw new Error("Order not found");

  // Customer only can cancel
  if (role === "CUSTOMER") {
    if (order.customerId !== userId) {
      throw new Error("Not your order");
    }

    if (status !== OrderStatus.CANCELLED) {
      throw new Error("Customer only can cancel");
    }
    if (order.status === "DELIVERED") {
      throw new Error("Delivered order cannot be cancelled");
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  // Seller can shipped,processing and delivered
  if (role === "SELLER") {
    const sellerOwnsItem = order.orderItems.some(
      (item) => item.medicine.sellerId === userId,
    );

    if (status === OrderStatus.CANCELLED) {
      throw new Error("Only customer can cancel");
    }
    if (!sellerOwnsItem) {
      throw new Error("You are not allowed to update this order");
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  throw new Error("Invalid role");
};

const getSellerStats = async (sellerId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          medicine: {
            sellerId,
          },
        },
      },
    },
    include: {
      orderItems: {
        include: {
          medicine: true,
        },
      },
    },
  });

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status === OrderStatus.DELIVERED,
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === OrderStatus.CANCELLED,
  ).length;
  const pendingOrders = orders.filter(
    (order) =>
      order.status === OrderStatus.PROCESSING ||
      order.status === OrderStatus.SHIPPED,
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== OrderStatus.CANCELLED)
    .reduce((sum, order) => sum + order.totalAmount, 0)
    .toFixed(2);

  return {
    totalOrders,
    deliveredOrders,
    pendingOrders,
    cancelledOrders,
    totalRevenue,
  };
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
  getSellerStats,
};
