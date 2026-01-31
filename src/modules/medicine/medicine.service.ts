import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (payload: any, sellerId: string) => {
  return prisma.medicine.create({
    data: {
      ...payload,
      sellerId,
    },
  });
};

const getAllMedicines = async (query: any) => {
  const {
    categoryId,
    manufacturer,
    minPrice,
    maxPrice,
    search,
    page = 1,
    limit = 10,
  } = query;

  const where: any = {};

  // Category filter
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Manufacturer filter
  if (manufacturer) {
    where.manufacturer = {
      contains: manufacturer,
      mode: "insensitive",
    };
  }

  // Search by name
  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        manufacturer: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) where.price.gte = Number(minPrice);
    if (maxPrice !== undefined) where.price.lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const medicines = await prisma.medicine.findMany({
    where,
    skip,
    take: Number(limit),
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
      reviews: {
        select: {
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
          rating: true,
          comment: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.medicine.count({ where });

  return {
    data: medicines,
    metaData: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getMedicineById = async (id: string) => {
  const medicine = prisma.medicine.findUnique({
    where: { id },
    include: { category: true, seller: true },
  });

  if (!medicine) throw new Error("Medicine not found");
  return medicine;
};

const updateMedicine = async (
  id: string,
  payload: Prisma.MedicineUpdateInput,
  sellerId: string,
) => {
  if (payload.price !== undefined && Number(payload.price) < 0)
    throw new Error("Price cannot be negative");

  if (payload.stock !== undefined && Number(payload.stock) < 0)
    throw new Error("Stock cannot be negative");

  const result = await prisma.medicine.updateMany({
    where: { id, sellerId },
    data: payload,
  });

  if (result.count === 0) {
    throw new Error("Medicine not found or unauthorized");
  }

  return result;
};

const deleteMedicine = async (id: string, sellerId: string) => {
  const result = await prisma.medicine.deleteMany({
    where: { id, sellerId },
  });

  if (result.count === 0) {
    throw new Error("Medicine not found or unauthorized");
  }

  return result;
};

export const MedicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
