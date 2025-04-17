/*
  Warnings:

  - You are about to drop the column `file_path` on the `Audio` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `Audio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filePath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Audio" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Audio";
DROP TABLE "Audio";
ALTER TABLE "new_Audio" RENAME TO "Audio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
