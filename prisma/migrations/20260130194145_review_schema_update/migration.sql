/*
  Warnings:

  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId,medicineId]` on the table `review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "review_customerId_medicineId_key" ON "review"("customerId", "medicineId");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
