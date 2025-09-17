-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('buyer', 'seller', 'admin', 'superAdmin');

-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('active', 'banned', 'warning', 'pending');

-- CreateTable
CREATE TABLE "public"."m_users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."role" NOT NULL DEFAULT 'buyer',
    "status" "public"."status" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "m_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_users_email_key" ON "public"."m_users"("email");
