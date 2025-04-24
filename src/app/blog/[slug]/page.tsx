import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { cache } from 'react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogPostPageProps {
  params: Promise< {
    slug: string;
  }>,
  searchParams: Promise<{
    preview?: string;
  }>
}

const getBlogPost = cache(async (slug: string, isPreview: boolean) => {
  const post = await db.blog.findFirst({
    where: {
      slug,
      ...(isPreview ? {} : { published: true }),
    },
  });

  if (!post) {
    return null;
  }

  return {
    ...post,
    date: post.date.toISOString(),
  };
});

export const revalidate = 3600;

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { preview } = await  searchParams;
  const { slug } = await  params;
  const isPreview = preview === 'true';
  const post = await getBlogPost(slug, isPreview);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <time dateTime={post.date}>
              {formatDate(new Date(post.date))}
            </time>
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
        </header>

        {post.coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-xl mb-8 bg-gray-100 dark:bg-gray-800">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {post.description}
          </p>
        )}

        <div 
          className="prose prose-orange dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post?.contentHtml || post.content || '' }}
        />
      </article>
    </div>
  );
} 