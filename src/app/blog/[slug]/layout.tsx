import { Metadata } from "next";
import prisma from "@/lib/prisma";
import LayoutWithNavbar from "@/components/layout/LayoutWithNavbar";

interface BlogPostLayoutProps {
    children: React.ReactNode;
    params: Promise< {
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blog.findFirst({
        where: {
        slug: slug,
        published: true,
        },
    });

    if (!post) {
        return {
        title: "Blog Post Not Found - AI CV Builder",
        description: "The requested blog post could not be found.",
        };
    }

    const imageMetadata = post.coverImage ? [{
        url: post.coverImage,
        alt: post.coverImageAlt || post.title,
    }] : [];

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.description || "",
        keywords: post.tags.join(", "),
        openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.description || "",
        images: imageMetadata,
        type: "article",
        },
        twitter: {
        card: "summary_large_image",
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.description || "",
        images: imageMetadata,
        },
    };
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
    return (
        <LayoutWithNavbar>
        <main className="min-h-screen bg-white dark:bg-black">
            {children}
        </main>
        </LayoutWithNavbar>
    );
} 