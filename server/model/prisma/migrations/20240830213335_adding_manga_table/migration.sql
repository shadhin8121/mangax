-- CreateTable
CREATE TABLE "manga_data" (
    "id" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "alternative_titles" TEXT[],
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "artists" TEXT[],
    "authors" TEXT[],
    "genres" TEXT[],
    "publishers" TEXT[],

    CONSTRAINT "manga_data_pkey" PRIMARY KEY ("id")
);
