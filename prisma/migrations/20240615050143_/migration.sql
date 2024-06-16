-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productTypeId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "productTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
