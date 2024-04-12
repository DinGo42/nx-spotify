/*
  Warnings:

  - You are about to drop the `_ListeningHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MusicTypes" AS ENUM ('JAZZ', 'ROCK', 'HIP_HOP', 'POP', 'DUB_STEP');

-- DropForeignKey
ALTER TABLE "_ListeningHistory" DROP CONSTRAINT "_ListeningHistory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListeningHistory" DROP CONSTRAINT "_ListeningHistory_B_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "genres" "MusicTypes"[];

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "genres" "MusicTypes"[];

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "genres" "MusicTypes"[],
ADD COLUMN     "listeners" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_ListeningHistory";

-- CreateTable
CREATE TABLE "ListeningHistory" (
    "id" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListeningHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListeningHistory_songId_key" ON "ListeningHistory"("songId");

-- CreateIndex
CREATE UNIQUE INDEX "ListeningHistory_userId_key" ON "ListeningHistory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_authorId_key" ON "Playlist"("authorId");

-- AddForeignKey
ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningHistory" ADD CONSTRAINT "ListeningHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
