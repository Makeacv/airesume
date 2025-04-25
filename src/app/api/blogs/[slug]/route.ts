import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { Prisma } from "@prisma/client";

interface BlogUpdateData {
  published?: boolean;
  title?: string;
  description?: string;
  content?: string;
  contentHtml?: string;
  coverImage?: string;
  coverImageAlt?: string;
  author?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  date?: Date;
  slug?: string;
}

async function deleteFileIfExists(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);

    if (existsSync(fullPath)) {
      await fs.unlink(fullPath);
      console.log(`Deleted file: ${fullPath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await db.blog.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        contentHtml: true,
        coverImage: true,
        coverImageAlt: true,
        author: true,
        tags: true,
        date: true,
        published: true,
        metaTitle: true,
        metaDescription: true,
      }
    });
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { slug } = await params;
    const body = await request.json();

    const existingBlog = await db.blog.findUnique({
      where: { slug },
    });
    
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
  
    const updateData: BlogUpdateData = {};
  
    if (body.published !== undefined) {
      updateData.published = body.published;
    }

    if (body.title) {
      updateData.title = body.title;
      updateData.description = body.description;
      updateData.content = body.content;
      updateData.contentHtml = body.contentHtml;
      updateData.coverImage = body.coverImage;
      updateData.coverImageAlt = body.coverImageAlt;
      updateData.author = body.author;
      updateData.tags = body.tags;
      updateData.metaTitle = body.metaTitle;
      updateData.metaDescription = body.metaDescription;
      
      if (body.date) {
        updateData.date = new Date(body.date);
      }

      if (body.newSlug && body.newSlug !== slug) {
        updateData.slug = body.newSlug;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ blog: existingBlog });
    }

    const updatedBlog = await db.blog.update({
      where: { slug },
      data: updateData,
    });
    
    return NextResponse.json({ blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { slug } = await params;

    const existingBlog = await db.blog.findUnique({
      where: { slug },
    });
    
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (existingBlog.coverImage) {
      if (existingBlog.coverImage.startsWith('/uploads/blog/')) {
        const deleted = await deleteFileIfExists(existingBlog.coverImage);
        if (deleted) {
          console.log(`Deleted cover image: ${existingBlog.coverImage}`);
        }
      }
    }

    await db.blog.delete({
      where: { slug },
    });
    
    return NextResponse.json({ 
      success: true,
      message: "Blog post and associated files deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}