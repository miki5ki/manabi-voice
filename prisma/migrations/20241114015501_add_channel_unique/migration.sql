/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `ChannelsCategoriesRelations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChannelsCategoriesRelations_channelId_key" ON "ChannelsCategoriesRelations"("channelId");
