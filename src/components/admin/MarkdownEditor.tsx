"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Bold, Italic, Link as LinkIcon, Image as ImageIcon, List, ListOrdered, Heading1, Heading2, Quote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MarkdownEditorProps {
  mode: "create" | "edit";
  initialData?: {
    title: string;
    slug?: string;
    description: string;
    content: string;
    tags: string[];
    date: string;
    coverImage?: string;
    author?: string;
  };
}

export function QuillEditor({ mode, initialData }: MarkdownEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [preview, setPreview] = useState("");
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    tags: initialData?.tags?.join(", ") || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    coverImage: initialData?.coverImage || "",
    author: initialData?.author || "",
  });

  // Generate preview when switching to preview tab
  useEffect(() => {
    if (activeTab === "preview") {
      // In a real app, you would use a proper markdown parser
      setPreview(formData.content);
    }
  }, [activeTab, formData.content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      }));
    }
  };

  const insertMarkdown = (markdownSyntax: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let textToInsert = "";
    switch (markdownSyntax) {
      case "bold":
        textToInsert = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        textToInsert = `*${selectedText || "italic text"}*`;
        break;
      case "link":
        textToInsert = `[${selectedText || "link text"}](url)`;
        break;
      case "image":
        textToInsert = `![${selectedText || "alt text"}](image-url)`;
        break;
      case "h1":
        textToInsert = `# ${selectedText || "Heading 1"}`;
        break;
      case "h2":
        textToInsert = `## ${selectedText || "Heading 2"}`;
        break;
      case "quote":
        textToInsert = `> ${selectedText || "Blockquote"}`;
        break;
      case "ul":
        textToInsert = `- ${selectedText || "List item"}`;
        break;
      case "ol":
        textToInsert = `1. ${selectedText || "List item"}`;
        break;
      default:
        textToInsert = selectedText;
    }
    
    const newContent = textarea.value.substring(0, start) + textToInsert + textarea.value.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + textToInsert.length;
      textarea.selectionEnd = start + textToInsert.length;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format tags
      const tags = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);
      
      // Create the post object
      const postData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        content: formData.content,
        tags,
        date: formData.date,
        coverImage: formData.coverImage,
        author: formData.author,
      };
      
      console.log("Saving post:", postData);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        router.push("/admin/blogs");
      }, 1000);
      
      // In a real app, you would make an API call:
      // const response = await fetch('/api/posts', {
      //   method: mode === 'create' ? 'POST' : 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(postData)
      // });
      
      // if (!response.ok) throw new Error('Failed to save post');
      // router.push('/admin/blogs');
      
    } catch (error) {
      console.error("Error saving post:", error);
      setIsLoading(false);
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
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Post"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full bg-gray-100 dark:bg-zinc-800 rounded-t-none">
                  <TabsTrigger value="write" className="flex-1">Write</TabsTrigger>
                  <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                </TabsList>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <TabsContent value="write" className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("bold")}>
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("italic")}>
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("link")}>
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("image")}>
                        <ImageIcon className="h-4 w-4" />
                        <span className="sr-only">Insert image</span>
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("h1")}>
                        <Heading1 className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("h2")}>
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("ul")}>
                        <List className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("ol")}>
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => insertMarkdown("quote")}>
                        <Quote className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your post content here using Markdown..."
                      rows={15}
                      className="font-mono resize-none"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="min-h-[300px] p-4 border rounded-md bg-white dark:bg-zinc-900">
                      {preview ? (
                        <div className="prose dark:prose-invert max-w-none">
                          {/* In a real app, you would render proper markdown here */}
                          <div className="whitespace-pre-wrap">{preview}</div>
                        </div>
                      ) : (
                        <p className="text-gray-400 dark:text-gray-500">Nothing to preview</p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
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
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/admin/blogs")}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Post"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
} 