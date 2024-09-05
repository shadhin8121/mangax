-- AlterTable
ALTER TABLE "manga_data" ADD COLUMN     "format" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "theme" TEXT[];
