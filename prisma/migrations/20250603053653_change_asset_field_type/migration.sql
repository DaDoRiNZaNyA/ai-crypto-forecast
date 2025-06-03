/*
  Warnings:

  - Made the column `asset` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Message" ALTER COLUMN "asset" SET NOT NULL,
ALTER COLUMN "asset" SET DATA TYPE TEXT;
