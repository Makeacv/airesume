"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Upload, X, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QuillEditor from "./QuillEditor";
import Quill from "quill";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface BlogEditorProps {
  mode: "create" | "edit";
  initialData?: {
    title: string;
    slug?: string;
    description: string;
    content: string;
    tags: string[];
    date: string;
    coverImage?: string;
    coverImageAlt?: string;
    author?: string;
    published?: boolean;
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface ErrorResponse {
  error: string;
}

export function BlogEditor({ mode, initialData }: BlogEditorProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const quillRef = useRef<Quill>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const Delta = Quill.import("delta");

  const getInitialDelta = () => {
    if (!initialData?.content) return new Delta();
    
    try {
      return new Delta(JSON.parse(initialData.content));
    } catch {
      return new Delta().insert(initialData.content);
    }
  };

  console.log(initialData, "initialData");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    tags: initialData?.tags?.join(", ") || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    coverImage: initialData?.coverImage || "",
    coverImageAlt: initialData?.coverImageAlt || "",
    author: initialData?.author || "",
    published: initialData?.published || false,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "title") {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '')
      }));
    }
  };

  const handlePublishToggle = (checked: boolean) => {
    setFormData(prev => ({ ...prev, published: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const tags = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);

      const contentDelta = quillRef.current?.getContents();
      const contentHtml = quillRef.current?.root.innerHTML;

      const method = mode === "create" ? "POST" : "PUT";

      interface PostData {
        title: string;
        slug: string;
        description: string;
        content: string;
        contentHtml?: string | undefined;
        tags: string[];
        date: string;
        coverImage: string;
        coverImageAlt: string;
        author: string;
        published: boolean;
        newSlug?: string;
        metaTitle?: string;
        metaDescription?: string;
      }
      
      const postData: PostData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: JSON.stringify(contentDelta),
        contentHtml: contentHtml,
        tags,
        date: formData.date,
        coverImage: formData.coverImage,
        coverImageAlt: formData.coverImageAlt,
        author: formData.author,
        published: formData.published,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      };

      if (mode === "edit" && initialData?.slug !== formData.slug) {
        postData.newSlug = formData.slug;
      }

      const url = mode === "create" 
        ? "/api/blogs" 
        : `/api/blogs/${initialData?.slug}`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const error = await response.json() as ErrorResponse;
        throw new Error(error.error || "Failed to save blog post");
      }

      toast({
        variant: "default",
        description: mode === "create" ? "Blog post created!" : "Blog post updated!",
      });

      router.push("/admin/blogs");
      router.refresh();
    } catch (error: unknown) {
      console.error("Error saving post:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save blog post";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json() as ErrorResponse;
        throw new Error(error.error || "Failed to upload image");
      }
      
      const { url } = await response.json();

      setFormData(prev => ({ ...prev, coverImage: url }));
      toast({
        variant: "default",
        description: "Image uploaded successfully",
      });
    } catch (error: unknown) {
      console.error("Error uploading image:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to upload image";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleTriggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: "" }));
  };

  const openPreview = () => {
    if (mode === "edit" && initialData?.slug) {
      const previewUrl = `/blog/${initialData.slug}?preview=true`;
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/blogs">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-orange-500">
              {mode === "create" ? "Create New Post" : `Edit Post: ${initialData?.title}`}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="published" 
                checked={formData.published}
                onCheckedChange={handlePublishToggle}
              />
              <Label htmlFor="published" className="cursor-pointer">
                {formData.published ? "Published" : "Draft"}
              </Label>
            </div>
            {mode === "edit" && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={openPreview} 
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            )}
            <Button type="submit" disabled={isLoading} className="gap-2">
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save Post"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <QuillEditor
                ref={quillRef}
                readOnly={false}
                defaultValue={getInitialDelta()}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Post title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="post-url-slug"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of your post"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="technology, tutorial, guide"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>

                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden" 
                />
                
                {formData.coverImage ? (
                  <div className="relative mt-2">
                    <div className="aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image 
                        src={formData.coverImage} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover" 
                        width={300}
                        height={150}
                      />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={clearCoverImage}
                      className="absolute top-2 right-2 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTriggerFileUpload}
                    disabled={isUploading}
                    className="w-full flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Upload Image</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    placeholder="Custom title for search engines (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    placeholder="Custom description for search engines (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImageAlt">Image Alt Text</Label>
                  <Input
                    id="coverImageAlt"
                    name="coverImageAlt"
                    value={formData.coverImageAlt}
                    onChange={handleChange}
                    placeholder="Descriptive text for the cover image"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
} 