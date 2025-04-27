"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight, ExternalLink, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type Blog = {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
};

type FilterState = "all" | "published" | "drafts";

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [filterStatus, setFilterStatus] = useState<FilterState>("all");
  const blogsPerPage = 9;
  const { toast } = useToast();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setPaginationLoading(true);
        const response = await fetch(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}&admin=true`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.total);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast({
          variant: "destructive",
          description: "Failed to load blog posts",
        });
      } finally {
        setLoading(false);
        setPaginationLoading(false);
      }
    };
    
    fetchBlogs();
  }, [currentPage, toast]);

  useEffect(() => {
    if (blogs.length === 0) return;

    let filtered = [...blogs];
    
    if (filterStatus === "published") {
      filtered = filtered.filter(blog => blog.published);
    } else if (filterStatus === "drafts") {
      filtered = filtered.filter(blog => !blog.published);
    }
    
    setFilteredBlogs(filtered);
  }, [blogs, filterStatus]);
  
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || paginationLoading) return;
    setPaginationLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      if (!searchQuery.trim()) {
        const response = await fetch(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}&admin=true`);
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.total);
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch(`/api/blogs?search=${encodeURIComponent(searchQuery)}&admin=true`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.blogs.length);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error searching blogs:", error);
        toast({
          variant: "destructive",
          description: "Failed to search blog posts",
        });
      } finally {
        setLoading(false);
      }
    };
    
    const timerId = setTimeout(() => {
      fetchFilteredBlogs();
    }, 300);
    
    return () => clearTimeout(timerId);
  }, [searchQuery, currentPage, blogsPerPage, toast]);
  
  const handleDeleteBlog = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      
      const updatedBlogs = blogs.filter(blog => blog.slug !== slug);
      setBlogs(updatedBlogs);
      toast({
        variant: "default",
        description: "Blog post deleted successfully",
      });
      
      if (updatedBlogs.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        variant: "destructive",
        description: "Failed to delete blog post",
      });
    }
  };
  
  const handleTogglePublished = async (slug: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !currentStatus,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update blog status");
      }
      
      setBlogs(blogs.map(blog => 
        blog.slug === slug 
          ? { ...blog, published: !currentStatus } 
          : blog
      ));
      
      toast({
        variant: "default",
        description: currentStatus 
          ? "Blog post unpublished" 
          : "Blog post published"
      });
    } catch (error) {
      console.error("Error updating blog status:", error);
      toast({
        variant: "destructive",
        description: "Failed to update blog status",
      });
    }
  };

  const publishedCount = blogs.filter(blog => blog.published).length;
  const draftCount = blogs.filter(blog => !blog.published).length;

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Blog Posts</h1>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <Filter className="h-4 w-4" />
                {filterStatus === "all" ? "All Posts" : 
                 filterStatus === "published" ? "Published Only" : 
                 "Drafts Only"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  <span className="flex-1">All Posts</span>
                  <Badge variant="outline">{blogs.length}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("published")}>
                  <span className="flex-1">Published</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500 border-green-200 dark:border-green-800">
                    {publishedCount}
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("drafts")}>
                  <span className="flex-1">Drafts</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500 border-yellow-200 dark:border-yellow-800">
                    {draftCount}
                  </Badge>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/admin/blogs/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Post
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search posts by title, description, or tag..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading blog posts...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-lg">
            {searchQuery ? "No matching blog posts found." : "No blog posts yet."}
          </p>
          <Link href="/admin/blogs/new">
            <Button className="mt-4">Create Your First Post</Button>
          </Link>
        </div>
      ) : (
        <>
          {paginationLoading && (
            <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="mt-4">Loading page {currentPage}...</p>
              </div>
            </div>
          )}
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <Card 
                key={blog.id} 
                className={`overflow-hidden flex flex-col ${!blog.published ? "border-yellow-300 dark:border-yellow-800" : ""}`}
              >
                {blog.coverImage && (
                  <div className="aspect-video overflow-hidden relative">
                    <Image 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover"
                      width={300}
                      height={200}
                    />
                    <div className="absolute top-2 right-2">
                      {blog.published && (
                        <Link href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View published post</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
                      <CardDescription>{formatDate(blog.date)}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1.5">
                        <Switch 
                          id={`published-${blog.id}`}
                          checked={blog.published}
                          onCheckedChange={() => handleTogglePublished(blog.slug, blog.published)}
                        />
                        <Label 
                          htmlFor={`published-${blog.id}`}
                          className={`cursor-pointer text-xs font-medium ${
                            blog.published 
                              ? "text-green-600 dark:text-green-500" 
                              : "text-yellow-600 dark:text-yellow-500"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {blog.description || "No description provided."}
                  </p>
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/blogs/${blog.slug}/edit`)}
                    className="gap-1"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteBlog(blog.slug)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {!searchQuery && totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || paginationLoading}
                    className={paginationLoading ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    if (index > 0 && page - prevPage > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${page}`}>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              onClick={() => handlePageChange(page)}
                              className={`h-10 w-10 ${paginationLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                              disabled={paginationLoading}
                            >
                              {page}
                            </Button>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    }
                    
                    return (
                      <PaginationItem key={page}>
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                          className={`h-10 w-10 ${paginationLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={paginationLoading}
                        >
                          {page}
                        </Button>
                      </PaginationItem>
                    );
                  })}
                
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || paginationLoading}
                    className={paginationLoading ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
} 