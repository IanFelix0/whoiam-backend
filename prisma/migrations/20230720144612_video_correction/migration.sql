-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_videos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "isPublic" BOOLEAN DEFAULT false,
    "playlistId" INTEGER,
    CONSTRAINT "videos_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_videos" ("description", "id", "isPublic", "playlistId", "title", "url") SELECT "description", "id", "isPublic", "playlistId", "title", "url" FROM "videos";
DROP TABLE "videos";
ALTER TABLE "new_videos" RENAME TO "videos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
