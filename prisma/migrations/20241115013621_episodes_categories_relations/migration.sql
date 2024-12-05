-- CreateTable
CREATE TABLE "EpisodesCategoriesRelations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "episodeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "EpisodesCategoriesRelations_episodeId_key" ON "EpisodesCategoriesRelations"("episodeId");
