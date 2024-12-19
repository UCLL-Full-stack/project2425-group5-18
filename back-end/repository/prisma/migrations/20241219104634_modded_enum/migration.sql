/*
  Warnings:

  - The values [PETROL,ELECTRIC,HYBRID] on the enum `Fuel` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [MANUAL,AUTOMATIC] on the enum `Transmission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Fuel_new" AS ENUM ('DIESEL', 'BENZINE', 'ELEKTRISCH', 'HYBRIDE', 'LPG');
ALTER TABLE "Car" ALTER COLUMN "fuel" TYPE "Fuel_new" USING ("fuel"::text::"Fuel_new");
ALTER TYPE "Fuel" RENAME TO "Fuel_old";
ALTER TYPE "Fuel_new" RENAME TO "Fuel";
DROP TYPE "Fuel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'COLLECTOR');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Transmission_new" AS ENUM ('MANUEEK', 'AUTOMAAT');
ALTER TABLE "Car" ALTER COLUMN "transmission" TYPE "Transmission_new" USING ("transmission"::text::"Transmission_new");
ALTER TYPE "Transmission" RENAME TO "Transmission_old";
ALTER TYPE "Transmission_new" RENAME TO "Transmission";
DROP TYPE "Transmission_old";
COMMIT;
