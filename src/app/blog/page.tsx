// import { redirect } from 'next/navigation';

// export default function Page() {
//   redirect('/');
// }


import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const revalidate = 3600;

const POSTS_PER_PAGE = 12;

interface Post {
  id: string;
  title: string;
  date: Date;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  author?: string | null;
  tags?: string[];
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const [posts, totalPosts] = await Promise.all([
    prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        date: 'desc',
      },
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.blog.count({
      where: {
        published: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const formattedPosts = posts.map((post: Post) => ({
    id: post.id,
    title: post.title,
    date: formatDate(post.date),
    slug: post.slug,
    description: post.description || "",
    coverImage: post.coverImage || "/images/default-blog-cover.jpg",
    author: post.author || "Admin",
    tags: post.tags || [],
  }));

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-6">Blog</h1>

      <div className="mx-auto">
        {formattedPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-lg">No blog posts published yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {formattedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition group">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {post.coverImage && (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={800}
                          height={400}
                          className="w-full h-full object-cover transition group-hover:scale-105"
                          priority
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-orange-500 mb-1">{post.title}</h2>

                      <p className="text-sm text-gray-500 dark:text-zinc-400 mb-2">
                        {post.date} {post.author && `• ${post.author}`}
                      </p>

                      <p className="text-gray-800 dark:text-zinc-100 text-base line-clamp-3">
                        {post.description}
                      </p>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  asChild
                >
                  <Link href={`/blog?page=${currentPage - 1}`}>
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      asChild
                    >
                      <Link href={`/blog?page=${page}`}>
                        {page}
                      </Link>
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  asChild
                >
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
