/*
  Warnings:

  - Changed the type of `expirationDate` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "expirationDate",
ADD COLUMN     "expirationDate" INTEGER NOT NULL;
