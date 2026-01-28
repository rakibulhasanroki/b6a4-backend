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
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Price range
  if (minPrice || maxPrice) {
    where.price = {};

    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
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
  return prisma.medicine.findUnique({
    where: { id },
    include: { category: true, seller: true },
  });
};

const updateMedicine = async (id: string, payload: any, sellerId: string) => {
  return prisma.medicine.updateMany({
    where: { id, sellerId },
    data: payload,
  });
};

const deleteMedicine = async (id: string, sellerId: string) => {
  return prisma.medicine.deleteMany({
    where: { id, sellerId },
  });
};

export const MedicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
