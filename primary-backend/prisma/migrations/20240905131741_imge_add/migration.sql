/*
  Warnings:

  - Added the required column `image` to the `AvalibleAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `AvalibleTrigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvalibleAction" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AvalibleTrigger" ADD COLUMN     "image" TEXT NOT NULL;
