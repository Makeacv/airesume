"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { BlogEditor } from "@/components/admin/BlogEditor";

interface BlogData {
  title: string;
  slug: string;
  content: string;
  description: string;
  coverImage?: string;
  coverImageAlt?: string;
  date: string;
  author?: string;
  tags: string[];
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export default function EditBlogPost() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    if (params && params.slug) {
      const slugValue = Array.isArray(params.slug) 
        ? params.slug[0] 
        : params.slug.toString();
      
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/blogs/${slugValue}`);
          
          if (!response.ok) {
            throw new Error("Failed to fetch blog");
          }
          
          const data = await response.json();
          setBlog(data.blog);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchBlog();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <Button variant="default" onClick={() => window.history.back()}>
          Back to Blogs
        </Button>
      </div>
    );
  }

  return <BlogEditor mode="edit" initialData={blog} />;
} 