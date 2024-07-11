-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "recurring_transaction" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "day_of_week" INTEGER,
    "day_of_month" INTEGER,
    "month" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "wallet_id" TEXT NOT NULL,

    CONSTRAINT "recurring_transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recurring_transaction" ADD CONSTRAINT "recurring_transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
