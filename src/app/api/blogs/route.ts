import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get("published") === "true";
    const isAdminRequest = searchParams.get("admin") === "true";
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    
    if (isAdminRequest) {
      const user = await currentUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const skip = (page - 1) * limit;
    
    const whereClause: Prisma.BlogWhereInput = {};
    
    if (!isAdminRequest && published !== undefined) {
      whereClause.published = published;
    } else if (!isAdminRequest) {
      whereClause.published = true;
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
        { description: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
      ];
      
      try {
        whereClause.OR.push({
          tags: { has: search }
        });
      } catch {
        console.warn("Tag search not supported, skipping");
      }
      
      const blogs = await prisma.blog.findMany({
        where: whereClause,
        orderBy: { date: "desc" },
      });
      
      return NextResponse.json({ blogs, total: blogs.length });
    }
    
    const [total, blogs] = await Promise.all([
      prisma.blog.count({ where: whereClause }),
      prisma.blog.findMany({
        where: whereClause,
        orderBy: { date: "desc" },
        skip,
        take: limit,
      })
    ]);
    
    return NextResponse.json({ blogs, total, page, limit });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { 
      title, 
      slug, 
      description, 
      content, 
      contentHtml, 
      coverImage,
      coverImageAlt,
      author, 
      tags, 
      date, 
      published,
      metaTitle,
      metaDescription
    } = body;
    
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }
    
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        description,
        content,
        contentHtml,
        coverImage,
        coverImageAlt,
        author,
        tags,
        date: new Date(date),
        published: published || false,
        metaTitle,
        metaDescription
      },
    });
    
    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
} 