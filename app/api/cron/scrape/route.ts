import { NextRequest, NextResponse } from "next/server";

// Skip this route during static export
export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minutes (Vercel Pro allows up to 300s)

// RSS Feeds - Polish financial sources
const RSS_FEEDS = [
  { url: "https://www.bankier.pl/rss/wiadomosci.xml", source: "Bankier.pl", category: "Finanse" },
  { url: "https://www.money.pl/rss/rss.xml", source: "Money.pl", category: "Gospodarka" },
  { url: "https://www.gpw.pl/rss_aktualnosci", source: "GPW", category: "Giełda" },
  { url: "https://www.parkiet.com/rss/parkiet.xml", source: "Parkiet", category: "Giełda" },
  { url: "https://forsal.pl/.feed", source: "Forsal", category: "Gospodarka" },
  { url: "https://www.rp.pl/rss/ekonomia", source: "Rzeczpospolita", category: "Ekonomia" },
  { url: "https://mybank.pl/news/wiadomosci-rss.xml", source: "MyBank", category: "Finanse" },
];

// Content selectors for different sources
const CONTENT_SELECTORS: Record<string, RegExp> = {
  "bankier.pl": /<div[^>]*class="[^"]*o-article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  "money.pl": /<div[^>]*class="[^"]*wp-main-article[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  "gpw.pl": /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  "parkiet.com": /<div[^>]*class="[^"]*article__content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  "forsal.pl": /<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  "rp.pl": /<article[^>]*>([\s\S]*?)<\/article>/i,
  "mybank.pl": /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
};

interface RSSArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  source: string;
  category: string;
  pubDate: string;
  image: string;
}

interface ScrapingStats {
  fetched: number;
  scraped: number;
  saved: number;
  skipped: number;
  errors: number;
}

// Fetch RSS feed
async function fetchRSS(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "FusionFinance Scraper/1.0",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) return null;
    return await response.text();
  } catch (error) {
    console.error(`[fetchRSS] Error fetching ${url}:`, error);
    return null;
  }
}

// Parse RSS XML
function parseRSS(content: string, source: string, category: string): RSSArticle[] {
  if (!content) return [];

  const articles: RSSArticle[] = [];

  try {
    // Simple XML parsing (no external dependencies)
    const itemMatches = content.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi);

    for (const itemMatch of itemMatches) {
      const itemContent = itemMatch[1];

      const titleMatch = itemContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const linkMatch = itemContent.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
      const descMatch = itemContent.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
      const pubDateMatch = itemContent.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
      const enclosureMatch = itemContent.match(/<enclosure[^>]*url="([^"]+)"/i);

      const title = titleMatch ? stripCDATA(titleMatch[1]).trim() : "";
      const link = linkMatch ? stripCDATA(linkMatch[1]).trim() : "";
      const description = descMatch ? stripHtml(stripCDATA(descMatch[1])).trim() : "";
      const pubDate = pubDateMatch ? stripCDATA(pubDateMatch[1]).trim() : new Date().toISOString();
      let image = enclosureMatch ? enclosureMatch[1] : "";

      // Try to extract image from description
      if (!image && descMatch) {
        const imgMatch = descMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch) image = imgMatch[1];
      }

      if (!title || !link) continue;

      articles.push({
        id: hashString(link),
        title,
        description,
        link,
        source,
        category,
        pubDate,
        image,
      });
    }
  } catch (error) {
    console.error(`[parseRSS] Error parsing RSS from ${source}:`, error);
  }

  return articles;
}

// Strip CDATA wrapper
function stripCDATA(str: string): string {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

// Strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// Simple hash function (MD5 alternative)
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Scrape full article content
async function scrapeArticleContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(15000), // 15s timeout
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Find content using selectors
    let content = "";
    for (const [domain, pattern] of Object.entries(CONTENT_SELECTORS)) {
      if (url.includes(domain)) {
        const match = html.match(pattern);
        if (match) {
          content = match[1];
          break;
        }
      }
    }

    // Fallback: try to find <article> tag
    if (!content) {
      const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
      if (articleMatch) content = articleMatch[1];
    }

    if (!content) return null;

    // Clean content
    return cleanArticleContent(content);
  } catch (error) {
    console.error(`[scrapeArticleContent] Error scraping ${url}:`, error);
    return null;
  }
}

// Clean article content
function cleanArticleContent(html: string): string {
  // Remove scripts, styles, forms, SVGs
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<form[^>]*>[\s\S]*?<\/form>/gi, "");
  html = html.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");

  // Remove images and captions
  html = html.replace(/Kliknij aby powiększyć[^•\n]*/gi, "");
  html = html.replace(/Zdjęcie ilustracyjne[^•\n]*/gi, "");
  html = html.replace(/<img[^>]*>/gi, "");

  // Remove navigation and breadcrumbs
  html = html.replace(/Strona główna[›>][^\n]*/gi, "");

  // Remove author, newsletter, "Najpopularniejsze"
  html = html.replace(/Opracowanie:[^\n]*/gi, "");
  html = html.replace(/Autor:[^\n]*/gi, "");
  html = html.replace(/Redakcja:[^\n]*/gi, "");
  html = html.replace(/Najpopularniejsze w BUSINESS INSIDER[\s\S]*/gi, "");
  html = html.replace(/Newsletter[\s\S]*ze świata biznesu i finansów[\s\S]*/gi, "");
  html = html.replace(/Dziękujemy, że przeczytałaś\/eś nasz artykuł do końca\.[\s\S]*/gi, "");
  html = html.replace(/Czy ten artykuł był pomocny\?[\s\S]*/gi, "");
  html = html.replace(/Zobacz także:[^\n]*\n/gi, "");
  html = html.replace(/Czytaj także w [A-Z\s]+\n/gi, "");

  // Convert HTML to text
  html = html.replace(/<br\s*\/?>/gi, "\n");
  html = html.replace(/<\/p>/gi, "\n\n");
  html = html.replace(/<\/div>/gi, "\n");
  html = html.replace(/<\/h[1-6]>/gi, "\n\n");
  html = html.replace(/<li[^>]*>/gi, "• ");
  html = html.replace(/<\/li>/gi, "\n");

  // Remove remaining HTML tags
  html = html.replace(/<[^>]*>/g, "");

  // Decode HTML entities
  html = html
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

  // Clean whitespace
  html = html.replace(/\t+/g, " ");
  html = html.replace(/ +/g, " ");
  html = html.replace(/\n +/g, "\n");
  html = html.replace(/ +\n/g, "\n");
  html = html.replace(/\n{3,}/g, "\n\n");

  return html.trim();
}

// Save article to database via API
async function saveArticleToDatabase(article: RSSArticle, content: string): Promise<boolean> {
  try {
    const CRON_SECRET = process.env.CRON_SECRET_KEY || "ff_scrape_2025_Kx9mP4vL";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://fusionfinance.pl";

    const response = await fetch(`${baseUrl}/api/articles/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRON_SECRET}`,
      },
      body: JSON.stringify({
        title: article.title,
        content,
        summary: article.description,
        sourceUrl: article.link,
        source: article.source,
        category: article.category,
        coverImage: article.image,
        publishedAt: article.pubDate,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error(`[saveArticleToDatabase] Error:`, error);
    return false;
  }
}

// Load processed articles from KV store (or memory)
let processedArticles: Set<string> = new Set();

function isProcessed(articleId: string): boolean {
  return processedArticles.has(articleId);
}

function markAsProcessed(articleId: string): void {
  processedArticles.add(articleId);
  // Keep only last 1000 articles in memory
  if (processedArticles.size > 1000) {
    const arr = Array.from(processedArticles);
    processedArticles = new Set(arr.slice(-1000));
  }
}

/**
 * GET /api/cron/scrape
 * Scrape articles from RSS feeds and save to database
 *
 * Security: Only allow requests from Vercel Cron or with secret key
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Security check - allow Vercel Cron (has special header) or Bearer token
    const authHeader = request.headers.get("authorization");
    const CRON_SECRET = process.env.CRON_SECRET_KEY || "ff_scrape_2025_Kx9mP4vL";

    // Vercel Cron automatically adds this header
    const isVercelCron = request.headers.get("x-vercel-cron") === "1";
    const isBearerAuth = authHeader === `Bearer ${CRON_SECRET}`;

    if (!isVercelCron && !isBearerAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[CRON SCRAPE] START");

    const stats: ScrapingStats = {
      fetched: 0,
      scraped: 0,
      saved: 0,
      skipped: 0,
      errors: 0,
    };

    // Fetch and process RSS feeds
    for (const feed of RSS_FEEDS) {
      console.log(`[CRON] Fetching RSS: ${feed.source}`);

      const rssContent = await fetchRSS(feed.url);
      if (!rssContent) {
        console.error(`[CRON] Failed to fetch ${feed.source}`);
        continue;
      }

      const articles = parseRSS(rssContent, feed.source, feed.category);
      stats.fetched += articles.length;
      console.log(`[CRON] Found ${articles.length} articles from ${feed.source}`);

      // Process max 5 newest articles from each source
      const articlesToProcess = articles.slice(0, 5);

      for (const article of articlesToProcess) {
        // Skip if already processed
        if (isProcessed(article.id)) {
          stats.skipped++;
          continue;
        }

        console.log(`[CRON] Scraping: ${article.title}`);

        // Scrape full content
        const content = await scrapeArticleContent(article.link);

        if (!content) {
          console.error(`[CRON] Failed to scrape: ${article.title}`);
          stats.errors++;
          continue;
        }

        stats.scraped++;

        // Check word count (minimum 500 words)
        const wordCount = content.split(/\s+/).length;
        if (wordCount < 500) {
          console.log(`[CRON] Article too short (${wordCount} words): ${article.title}`);
          stats.skipped++;
          markAsProcessed(article.id);
          continue;
        }

        // Save to database
        const saved = await saveArticleToDatabase(article, content);

        if (saved) {
          console.log(`[CRON] SUCCESS: Saved (${wordCount} words) - ${article.title}`);
          stats.saved++;
          markAsProcessed(article.id);
        } else {
          console.error(`[CRON] Failed to save to DB: ${article.title}`);
          stats.errors++;
        }

        // Pause between requests (2 seconds)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[CRON SCRAPE] END - Duration: ${duration}ms`);
    console.log(`[CRON SCRAPE] Stats:`, stats);

    return NextResponse.json({
      success: true,
      duration: `${duration}ms`,
      stats,
    });
  } catch (error) {
    console.error("[CRON SCRAPE] Error:", error);
    return NextResponse.json(
      {
        error: "Scraping failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


