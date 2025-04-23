"use client";

import { BlogEditor } from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
  return (
    <BlogEditor 
      mode="create" 
      initialData={{
        title: "",
        description: "",
        content: "",
        tags: [],
        date: new Date().toISOString().split("T")[0]
      }}
    />
  );
} 