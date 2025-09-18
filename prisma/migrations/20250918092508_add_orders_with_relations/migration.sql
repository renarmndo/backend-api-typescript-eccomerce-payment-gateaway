-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."m_seller_products" ALTER COLUMN "image_url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."m_orders" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "m_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."m_orders" ADD CONSTRAINT "m_orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "public"."m_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."m_orders" ADD CONSTRAINT "m_orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."m_seller_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
