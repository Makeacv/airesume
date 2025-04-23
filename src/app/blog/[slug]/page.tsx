import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    preview?: string;
  }>;
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  const { preview } = await props.searchParams;
  const isPreview = preview === 'true';

  const whereClause = {
    slug,
    ...(isPreview ? {} : { published: true }),
  };

  const post = await db.blog.findUnique({
    where: whereClause,
  });
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Blog`,
    description: post.description || `Read more about ${post.title}`,
    openGraph: post.coverImage
      ? {
          images: [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }
      : undefined,
  };
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;
  const { preview } = await props.searchParams;
  const isPreview = preview === 'true';
  
  // If in preview mode, ensure the user is authenticated as admin
  if (isPreview) {
    const user = await currentUser();
    if (!user) {
      // Redirect unauthenticated users trying to preview to the login page
      redirect('/sign-in?redirect=' + encodeURIComponent(`/blog/${slug}?preview=true`));
    }
  }
  
  // Build the where clause based on preview mode
  const whereClause = {
    slug,
    ...(isPreview ? {} : { published: true }), // Only filter by published if not in preview
  };
  
  // Fetch the blog post from the database
  const post = await db.blog.findUnique({
    where: whereClause,
  });
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      {isPreview && !post.published && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-yellow-800 dark:text-yellow-500 font-medium">
              Preview Mode: This post is not yet published
            </div>
          </div>
        </div>
      )}
      
      {post.coverImage && (
        <div className="mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={500}
            className="w-full h-auto aspect-video object-cover rounded-lg shadow-md"
            priority
          />
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-3">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          {post.author && <span>By {post.author}</span>}
          {post.author && <span>•</span>}
          <span>{formatDate(post.date)}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-orange-400 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {post.description && (
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 border-l-4 border-orange-500 pl-4 italic">
            {post.description}
          </p>
        )}
      </div>
      
      <div 
        className="prose prose-orange max-w-none prose-headings:text-orange-500 prose-a:text-blue-600 dark:prose-invert dark:prose-a:text-blue-400"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
      />
    </div>
  );
} 