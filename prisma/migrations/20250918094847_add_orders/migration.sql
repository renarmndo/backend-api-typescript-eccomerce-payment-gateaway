/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `m_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `m_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceUrl` to the `m_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `m_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."m_orders" ADD COLUMN     "invoiceId" TEXT NOT NULL,
ADD COLUMN     "invoiceUrl" TEXT NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "m_orders_invoiceId_key" ON "public"."m_orders"("invoiceId");
