-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SOLD_OUT');

-- CreateTable
CREATE TABLE "public"."CategoryProduct" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "CategoryProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."m_seller_products" (
    "id" TEXT NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "status" "public"."ProductStatus" NOT NULL DEFAULT 'INACTIVE',
    "discount" DECIMAL(5,2),
    "rating" DECIMAL(2,1),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categori_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,

    CONSTRAINT "m_seller_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."m_seller_products" ADD CONSTRAINT "m_seller_products_categori_id_fkey" FOREIGN KEY ("categori_id") REFERENCES "public"."CategoryProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_seller_products" ADD CONSTRAINT "m_seller_products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "public"."m_seller_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
