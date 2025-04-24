/*
  Warnings:

  - Made the column `contentHtml` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Blog_metaDescription_idx";

-- DropIndex
DROP INDEX "Blog_tags_idx";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "contentHtml" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Blog_title_description_idx" ON "Blog"("title", "description");
