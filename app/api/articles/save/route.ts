import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Skip this route during static export
export const dynamic = "force-dynamic";

interface SaveArticleRequest {
  title: string;
  content: string;
  summary: string;
  sourceUrl: string;
  source: string;
  category?: string;
  coverImage?: string;
  publishedAt?: string;
}

/**
 * POST /api/articles/save
 * Save scraped article to database
 * 
 * Security: Only allow requests from CRON (check secret key)
 */
export async function POST(request: NextRequest) {
  try {
    // Security check - only allow CRON
    const authHeader = request.headers.get("authorization");
    const CRON_SECRET = process.env.CRON_SECRET_KEY || "ff_cron_2025_T8s9h4Kz";
    
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SaveArticleRequest = await request.json();
    const { title, content, summary, sourceUrl, source, category, coverImage, publishedAt } = body;

    // Validation
    if (!title || !content || !sourceUrl) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, sourceUrl" },
        { status: 400 }
      );
    }

    // Check word count (minimum 500 words)
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 500) {
      return NextResponse.json(
        { error: `Article too short: ${wordCount} words (minimum 500)` },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9ąćęłńóśźż\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100) + "-" + Date.now();

    // Check if article already exists (by sourceUrl)
    const existing = await prisma.article.findFirst({
      where: { source: sourceUrl },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Article already exists", id: existing.id },
        { status: 200 }
      );
    }

    // Save to database
    const article = await prisma.article.create({
      data: {
        slug,
        title,
        summary: summary || content.substring(0, 300) + "...",
        content,
        coverImage,
        category,
        source: sourceUrl,
        tags: [source, category].filter(Boolean) as string[],
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        wordCount,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("[articles/save] Error:", error);
    return NextResponse.json(
      { error: "Failed to save article", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

