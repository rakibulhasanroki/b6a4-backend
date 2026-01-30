import { prisma } from "../../lib/prisma";

const createReview = async (
  customerId: string,
  medicineId: string,
  rating: number,
  comment?: string,
) => {
  const isOrdered = await prisma.orderItems.findFirst({
    where: {
      medicineId,
      order: {
        customerId,
      },
    },
  });

  if (!isOrdered) {
    throw new Error("You can only review medicines you have ordered");
  }

  return prisma.review.create({
    data: {
      customerId,
      medicineId,
      rating,
      comment: comment ?? null,
    },
  });
};
const getReviewsByMedicine = async (medicineId: string) => {
  return prisma.review.findMany({
    where: { medicineId },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = {
  createReview,
  getReviewsByMedicine,
};
