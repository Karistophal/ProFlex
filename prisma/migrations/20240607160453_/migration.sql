/*
  Warnings:

  - You are about to drop the `_ProductToProductType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToProductType" DROP CONSTRAINT "_ProductToProductType_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductType" DROP CONSTRAINT "_ProductToProductType_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productTypeId" TEXT;

-- DropTable
DROP TABLE "_ProductToProductType";

-- CreateTable
CREATE TABLE "ProductTrending" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductTrending_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductTrending_productId_key" ON "ProductTrending"("productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTrending" ADD CONSTRAINT "ProductTrending_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
