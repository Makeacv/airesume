import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ 
      success: true,
      message: "File deleted successfully" 
    });
    
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ 
      error: "Failed to delete file",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 