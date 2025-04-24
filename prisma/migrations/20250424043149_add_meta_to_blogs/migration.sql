-- DropIndex
DROP INDEX "Blog_author_idx";

-- DropIndex
DROP INDEX "Blog_date_idx";

-- DropIndex
DROP INDEX "Blog_published_idx";

-- DropIndex
DROP INDEX "Blog_tags_idx";

-- DropIndex
DROP INDEX "Blog_title_idx";

-- AlterTable: Add new columns safely
ALTER TABLE "Blog" 
ADD COLUMN IF NOT EXISTS "coverImageAlt" TEXT,
ADD COLUMN IF NOT EXISTS "metaTitle" TEXT,
ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;

-- Update existing records to use tags as keywords
UPDATE "Blog" 
SET "metaTitle" = title,
    "metaDescription" = description
WHERE "metaTitle" IS NULL 
   OR "metaDescription" IS NULL;

-- Create indexes for SEO fields
CREATE INDEX IF NOT EXISTS "Blog_metaTitle_idx" ON "Blog"("metaTitle");
CREATE INDEX IF NOT EXISTS "Blog_metaDescription_idx" ON "Blog"("metaDescription");

-- Recreate any dropped indexes if they don't exist
CREATE INDEX IF NOT EXISTS "Blog_author_idx" ON "Blog"("author");
CREATE INDEX IF NOT EXISTS "Blog_date_idx" ON "Blog"("date");
CREATE INDEX IF NOT EXISTS "Blog_published_idx" ON "Blog"("published");
CREATE INDEX IF NOT EXISTS "Blog_tags_idx" ON "Blog" USING gin("tags");
CREATE INDEX IF NOT EXISTS "Blog_title_idx" ON "Blog"("title");
