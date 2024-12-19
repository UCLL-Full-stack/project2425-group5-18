/*
  Warnings:

  - The values [MANUEEK] on the enum `Transmission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Transmission_new" AS ENUM ('MANUEEL', 'AUTOMAAT');
ALTER TABLE "Car" ALTER COLUMN "transmission" TYPE "Transmission_new" USING ("transmission"::text::"Transmission_new");
ALTER TYPE "Transmission" RENAME TO "Transmission_old";
ALTER TYPE "Transmission_new" RENAME TO "Transmission";
DROP TYPE "Transmission_old";
COMMIT;
