-- DropIndex
DROP INDEX "Donation_email_key";

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "email" DROP NOT NULL;
