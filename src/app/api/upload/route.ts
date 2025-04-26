import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";

const MAX_FILE_SIZE = 30 * 1024 * 1024;
const VALID_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!VALID_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type. Allowed types: ${VALID_TYPES.join(", ")}` 
      }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }, { status: 400 });
    }

    try {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${randomString}.${extension}`;

      const { url, downloadUrl } = await put(filename, file, {
        access: 'public',
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });

      console.log('File uploaded successfully:', {
        url,
        downloadUrl,
        filename
      });

      return NextResponse.json({ 
        url,
        downloadUrl,
        success: true,
        filename
      });

    } catch (error) {
      console.error("Error uploading to Vercel Blob:", error);
      return NextResponse.json({ 
        error: "Failed to upload file to Vercel Blob Storage",
        details: error instanceof Error ? error.message : "Unknown error"
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Error handling upload:", error);
    return NextResponse.json({ 
      error: "Internal server error during upload",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 