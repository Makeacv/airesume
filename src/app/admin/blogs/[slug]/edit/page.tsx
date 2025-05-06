"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { useToast } from "@/hooks/use-toast";

interface PostData {
  title: string;
  description: string;
  content: string;
  contentHtml?: string;
  tags: string[];
  date: string;
  slug: string;
  coverImage?: string;
  coverImageAlt?: string;
  author?: string;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export default function EditBlogPost() {
  const { slug } = useParams();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        
        const { blog } = await response.json();
        
        setPostData({
          title: blog.title,
          description: blog.description || "",
          content: blog.content,
          contentHtml: blog.contentHtml,
          tags: blog.tags || [],
          date: blog.date ? new Date(blog.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
          slug: blog.slug,
          coverImage: blog.coverImage,
          coverImageAlt: blog.coverImageAlt,
          author: blog.author,
          published: blog.published,
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({
          variant: "destructive",
          description: "Failed to load blog post",
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPostData();
    }
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="container py-10 mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading post data...</p>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="container py-10 mx-auto">
        <div className="p-8 text-center bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-lg">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 mx-auto">
      <BlogEditor 
        mode="edit" 
        initialData={postData}
      />
    </div>
  );
} 