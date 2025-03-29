// src/app/blog/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  title: string;
  date: string;
  slug: string;
  description: string;
  image?: string;
  author?: string;
  tags?: string[];
}

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (!data.slug || !data.title || !data.date) return null;

      // Check if image exists in /public
      const publicImagePath = path.join(process.cwd(), 'public', (data.image || '').replace(/^\//, ''));
      const imageExists = data.image && fs.existsSync(publicImagePath);
      const imagePath = imageExists ? data.image : "/thumbnails/default.png";

      return {
        title: data.title,
        date: data.date,
        slug: data.slug,
        description: data.description || "",
        image: imagePath,
        author: data.author || "Unknown",
        tags: data.tags || [],
      };
    })
    .filter(Boolean) as Post[]; // ✅ Cast after filtering

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-6">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="rounded-xl overflow-hidden border border-zinc-800 hover:shadow-lg hover:bg-zinc-900 transition">
              <Image
                src={post.image!}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-orange-500 mb-1">{post.title}</h2>

                <p className="text-sm text-gray-500 dark:text-zinc-400 mb-2">
                  {post.date}
                </p>

                <p className="text-gray-800 dark:text-zinc-100 text-base line-clamp-3">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
