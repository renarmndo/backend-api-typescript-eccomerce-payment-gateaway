/*
  Warnings:

  - You are about to drop the column `AccountHolder` on the `m_seller_profile` table. All the data in the column will be lost.
  - Added the required column `accountHolder` to the `m_seller_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."m_seller_profile" DROP COLUMN "AccountHolder",
ADD COLUMN     "accountHolder" TEXT NOT NULL;
