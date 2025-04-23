import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'public/uploads/blog');

async function getRandomCoverImage(): Promise<string> {
  try {
    const files = await fs.readdir(BLOG_IMAGES_DIR);
    // Filter out any non-image files if needed
    const imageFiles = files.filter(file => 
      file.endsWith('.png') || 
      file.endsWith('.jpg') || 
      file.endsWith('.jpeg') || 
      file.endsWith('.webp') || 
      file.endsWith('.avif')
    );
    
    if (imageFiles.length === 0) {
      return ''; // Return empty if no images found
    }
    
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    return `/uploads/blog/${randomImage}`;
  } catch (error) {
    console.error('Error accessing image directory:', error);
    return ''; // Return empty on error
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/gi, '-');
}

async function generateBlogPost() {
  const title = faker.lorem.sentence().slice(0, 80);
  const slug = generateSlug(title);
  const description = faker.lorem.paragraph(2);
  const content = Array(8)
    .fill(null)
    .map(() => `## ${faker.lorem.sentence()}\n\n${faker.lorem.paragraphs(3, '\n\n')}`)
    .join('\n\n');
  const contentHtml = content; // In a real scenario, you'd convert markdown to HTML
  const coverImage = await getRandomCoverImage();
  const date = faker.date.past({ years: 2 });
  const published = Math.random() > 0.3; // 70% of posts are published
  const tags = Array(Math.floor(Math.random() * 4) + 1)
    .fill(null)
    .map(() => faker.word.sample());

  return {
    title,
    slug,
    description,
    content,
    contentHtml,
    coverImage,
    author: 'AI Resume Builder',
    tags,
    date,
    published,
  };
}

async function seedBlogs() {
  console.log('🌱 Seeding blog posts...');
  
  try {
    // Check if we already have blog posts
    const existingCount = await prisma.blog.count();
    console.log(`Found ${existingCount} existing blog posts.`);
    
    // Generate and insert 20 blog posts
    const toCreate = 20;
    console.log(`Creating ${toCreate} dummy blog posts...`);
    
    for (let i = 0; i < toCreate; i++) {
      const blogPost = await generateBlogPost();
      await prisma.blog.create({
        data: blogPost,
      });
      console.log(`Created blog post ${i + 1}/${toCreate}: ${blogPost.title}`);
    }
    
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBlogs(); 