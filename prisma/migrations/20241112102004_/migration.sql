/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Episode_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Channel_title_key" ON "Channel"("title");
