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

  // Get all medicines from DB
  const medicineIds = orderItems.map((item) => item.medicineId);

  const medicines = await prisma.medicine.findMany({
    where: { id: { in: medicineIds } },
  });

  console.log(medicines);
  // Validate all medicines exist
  if (medicines.length !== orderItems.length) {
    throw new Error("One or more medicines not found");
  }

  let totalAmount = 0;

  const orderItemsData = orderItems.map((item) => {
    const medicine = medicines.find((m) => m.id === item.medicineId)!;

    if (medicine.stock < item.quantity) {
      throw new Error(`Not enough stock for ${medicine.name}`);
    }

    totalAmount += medicine.price * item.quantity;

    return {
      medicineId: medicine.id,
      quantity: item.quantity,
      price: medicine.price,
    };
  });

  // create order + items
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
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

    // Reduce stock
    for (const item of orderItems) {
      await tx.medicine.update({
        where: { id: item.medicineId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    return newOrder;
  });

  return order;
};

const getMyOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
            },
          },
        },
      },
    },
  });
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
              name: true,
              image: true,
              price: true,
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

export const OrderService = {
  createOrder,
  getMyOrders,
  getOrderById,
};
