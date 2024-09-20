/*
  Warnings:

  - You are about to drop the column `translator_id` on the `manga_and_translator_connection` table. All the data in the column will be lost.
  - You are about to drop the `translator` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[manga_id,user_id]` on the table `manga_and_translator_connection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `manga_and_translator_connection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `manga_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'CONTRIBUTOR', 'TRANSLATOR', 'ADMIN', 'OWNER', 'MODERATOR');

-- DropForeignKey
ALTER TABLE "manga_and_translator_connection" DROP CONSTRAINT "manga_and_translator_connection_translator_id_fkey";

-- DropIndex
DROP INDEX "manga_and_translator_connection_manga_id_translator_id_key";

-- AlterTable
ALTER TABLE "manga_and_translator_connection" DROP COLUMN "translator_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CONTRIBUTOR',
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "manga_and_translator_connection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "manga_data" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total_chapters" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "personal_discord" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "translator_group" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website_name" TEXT;

-- DropTable
DROP TABLE "translator";

-- CreateIndex
CREATE INDEX "manga_and_translator_connection_manga_id_user_id_idx" ON "manga_and_translator_connection"("manga_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "manga_and_translator_connection_manga_id_user_id_key" ON "manga_and_translator_connection"("manga_id", "user_id");

-- CreateIndex
CREATE INDEX "manga_data_title_idx" ON "manga_data"("title");

-- CreateIndex
CREATE INDEX "manga_data_alternative_titles_idx" ON "manga_data"("alternative_titles");

-- CreateIndex
CREATE INDEX "manga_data_rating_idx" ON "manga_data"("rating");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- AddForeignKey
ALTER TABLE "manga_and_translator_connection" ADD CONSTRAINT "manga_and_translator_connection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
