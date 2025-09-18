/*
  Warnings:

  - You are about to drop the `CategoryProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."m_seller_products" DROP CONSTRAINT "m_seller_products_categori_id_fkey";

-- DropTable
DROP TABLE "public"."CategoryProduct";

-- CreateTable
CREATE TABLE "public"."m_category_products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "m_category_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."m_seller_products" ADD CONSTRAINT "m_seller_products_categori_id_fkey" FOREIGN KEY ("categori_id") REFERENCES "public"."m_category_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
