/*
  Warnings:

  - Added the required column `sellerId` to the `medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BANNED');

-- DropForeignKey
ALTER TABLE "medicine" DROP CONSTRAINT "medicine_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_medicineId_fkey";

-- AlterTable
ALTER TABLE "medicine" ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "customerId" TEXT;

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
