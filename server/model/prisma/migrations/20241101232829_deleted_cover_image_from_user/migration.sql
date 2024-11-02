/*
  Warnings:

  - You are about to drop the column `cover_image` on the `user` table. All the data in the column will be lost.
  - Added the required column `cover_image` to the `manga_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "manga_data" ADD COLUMN     "cover_image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "cover_image";
