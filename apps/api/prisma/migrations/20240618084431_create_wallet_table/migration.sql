-- CreateEnum
CREATE TYPE "Currencies" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'RUB');

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" "Currencies" NOT NULL,
    "current_balance" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
