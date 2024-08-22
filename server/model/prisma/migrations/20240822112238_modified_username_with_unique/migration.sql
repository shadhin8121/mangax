/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `translator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "translator_username_key" ON "translator"("username");
