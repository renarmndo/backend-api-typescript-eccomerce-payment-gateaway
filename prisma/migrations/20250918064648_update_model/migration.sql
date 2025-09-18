/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `m_category_products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `m_category_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."m_category_products" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "m_category_products_name_key" ON "public"."m_category_products"("name");

-- AddForeignKey
ALTER TABLE "public"."m_category_products" ADD CONSTRAINT "m_category_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."m_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
