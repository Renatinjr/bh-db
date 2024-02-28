/*
  Warnings:

  - The `categorias_adicionais` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categorias_adicionais",
ADD COLUMN     "categorias_adicionais" JSONB;
