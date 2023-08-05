/*
  Warnings:

  - You are about to drop the column `authorId` on the `books` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `books_authorId_idx` ON `books`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `authorId`,
    ADD COLUMN `author_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `books_author_id_idx` ON `books`(`author_id`);
