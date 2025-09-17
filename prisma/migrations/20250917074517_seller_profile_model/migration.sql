-- CreateEnum
CREATE TYPE "public"."BisnisType" AS ENUM ('individual', 'company', 'partnership');

-- CreateTable
CREATE TABLE "public"."m_seller_profile" (
    "id" TEXT NOT NULL,
    "nama_usaha" VARCHAR(255) NOT NULL,
    "tipe_usaha" "public"."BisnisType" NOT NULL DEFAULT 'individual',
    "deskripsi" TEXT,
    "website" TEXT,
    "no_tlp" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'indonesia',
    "bankName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "AccountHolder" TEXT NOT NULL,
    "status" "public"."status" NOT NULL DEFAULT 'pending',
    "rejectionReason" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "KTP" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "m_seller_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_seller_profile_no_tlp_key" ON "public"."m_seller_profile"("no_tlp");

-- CreateIndex
CREATE UNIQUE INDEX "m_seller_profile_userId_key" ON "public"."m_seller_profile"("userId");

-- AddForeignKey
ALTER TABLE "public"."m_seller_profile" ADD CONSTRAINT "m_seller_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."m_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
