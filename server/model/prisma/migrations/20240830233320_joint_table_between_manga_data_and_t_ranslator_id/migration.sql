-- CreateTable
CREATE TABLE "manga_and_translator_connection" (
    "id" TEXT NOT NULL,
    "manga_id" TEXT NOT NULL,
    "translator_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "manga_and_translator_connection_manga_id_translator_id_key" ON "manga_and_translator_connection"("manga_id", "translator_id");

-- AddForeignKey
ALTER TABLE "manga_and_translator_connection" ADD CONSTRAINT "manga_and_translator_connection_translator_id_fkey" FOREIGN KEY ("translator_id") REFERENCES "translator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manga_and_translator_connection" ADD CONSTRAINT "manga_and_translator_connection_manga_id_fkey" FOREIGN KEY ("manga_id") REFERENCES "manga_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
