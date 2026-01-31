/*
  Warnings:

  - A unique constraint covering the columns `[name,manufacturer,sellerId]` on the table `medicine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "medicine_name_manufacturer_sellerId_key" ON "medicine"("name", "manufacturer", "sellerId");
