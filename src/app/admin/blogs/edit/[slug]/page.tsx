"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

interface BlogData {
  title: string;
  slug: string;
  content: string;
  description?: string;
  coverImage?: string;
  date?: string;
  author?: string;
  tags?: string[];
  published?: boolean;
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
        <Link href="/admin/blogs">
          <Button>Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-orange-500">Edit Post: {blog.title}</h1>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <Input id="title" placeholder="Post title" defaultValue={blog.title} />
          </div>
          <div className="space-y-2">
            <label htmlFor="content">Content</label>
            <Textarea 
              id="content" 
              placeholder="Write your post content here" 
              rows={10}
              defaultValue={blog.content}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 