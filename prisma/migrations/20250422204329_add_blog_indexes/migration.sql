-- CreateIndex
CREATE INDEX "Blog_title_idx" ON "Blog"("title");

-- CreateIndex
CREATE INDEX "Blog_author_idx" ON "Blog"("author");

-- CreateIndex
CREATE INDEX "Blog_date_idx" ON "Blog"("date");

-- CreateIndex
CREATE INDEX "Blog_published_idx" ON "Blog"("published");

-- CreateIndex
CREATE INDEX "Blog_tags_idx" ON "Blog"("tags");
