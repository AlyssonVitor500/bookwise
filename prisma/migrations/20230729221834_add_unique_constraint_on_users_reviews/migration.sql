/*
  Warnings:

  - A unique constraint covering the columns `[book_id,user_id]` on the table `users_reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_reviews_book_id_user_id_key` ON `users_reviews`(`book_id`, `user_id`);
