const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const fs = require('fs/promises');
const path = require('path');
const { marked } = require('marked');

const prisma = new PrismaClient();

const BLOG_IMAGES_DIR = path.join(process.cwd(), 'public/uploads/blog');

// Configure marked for GitHub flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

async function getRandomCoverImage() {
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

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/gi, '-');
}

async function generateBlogPost() {
  const title = faker.lorem.sentence().slice(0, 80);
  const slug = generateSlug(title);
  const description = faker.lorem.paragraph(2);
  
  // Create rich markdown content
  const content = `
# ${title}

${faker.lorem.paragraphs(2, '\n\n')}

## ${faker.lorem.sentence()}

${faker.lorem.paragraphs(2, '\n\n')}

![An example image](${await getRandomCoverImage()})

${faker.lorem.paragraph()}

## ${faker.lorem.sentence()}

${faker.lorem.paragraphs(3, '\n\n')}

### ${faker.lorem.sentence()}

${faker.lorem.paragraphs(1, '\n\n')}

* ${faker.lorem.sentence()}
* ${faker.lorem.sentence()}
* ${faker.lorem.sentence()}

## ${faker.lorem.sentence()}

${faker.lorem.paragraphs(2, '\n\n')}

> ${faker.lorem.paragraph()}

${faker.lorem.paragraphs(1, '\n\n')}
  `;
  
  // Convert markdown to HTML
  const contentHtml = marked(content);
  
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

async function updateExistingBlogHtml() {
  // Get all existing blog posts
  const existingBlogs = await prisma.blog.findMany();
  console.log(`Found ${existingBlogs.length} existing blog posts to update.`);
  
  // Update contentHtml for each post
  for (const blog of existingBlogs) {
    const contentHtml = marked(blog.content || '');
    await prisma.blog.update({
      where: { id: blog.id },
      data: { contentHtml }
    });
    console.log(`Updated HTML content for blog post: ${blog.title}`);
  }
  console.log('✅ All existing posts updated with proper HTML!');
}

async function seedBlogs() {
  console.log('🌱 Seeding blog posts...');
  
  try {
    // First update any existing blog posts with proper HTML
    await updateExistingBlogHtml();
    
    // Check if we already have blog posts
    const existingCount = await prisma.blog.count();
    
    // Generate and insert new blog posts if needed
    const toCreate = 20 - existingCount;
    
    if (toCreate > 0) {
      console.log(`Creating ${toCreate} new dummy blog posts...`);
      
      for (let i = 0; i < toCreate; i++) {
        const blogPost = await generateBlogPost();
        await prisma.blog.create({
          data: blogPost,
        });
        console.log(`Created blog post ${i + 1}/${toCreate}: ${blogPost.title}`);
      }
    } else {
      console.log('You already have 20 or more blog posts. No new posts created.');
    }
    
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBlogs(); 