/*
  Warnings:

  - Made the column `stripePriceId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "stripePriceId" SET NOT NULL;
