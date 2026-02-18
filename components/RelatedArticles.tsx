"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { RssItem } from "@/types/rss";

interface RelatedArticlesProps {
  currentTitle: string;
  currentKeywords?: string[];
  maxArticles?: number;
  feedType?: string;
}

// Theme-based fallback images
const themeImages: Record<string, string> = {
  crypto: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&q=80",
  forex: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&q=80",
  stocks: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&q=80",
  default: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
};

function detectTheme(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("bitcoin") || lowerTitle.includes("crypto") || lowerTitle.includes("ethereum")) return "crypto";
  if (lowerTitle.includes("eur/") || lowerTitle.includes("usd/") || lowerTitle.includes("forex")) return "forex";
  if (lowerTitle.includes("gpw") || lowerTitle.includes("wig") || lowerTitle.includes("giełd")) return "stocks";
  return "default";
}

function getImageUrl(article: RssItem): string {
  if (article.image && article.image.startsWith("http")) return article.image;
  return themeImages[detectTheme(article.title)];
}

function extractKeywords(text: string): string[] {
  const stopWords = ["i", "w", "na", "do", "z", "o", "po", "za", "się", "to", "jak", "co", "ale", "czy", "tak", "nie"];
  return text.toLowerCase()
    .replace(/[^a-ząćęłńóśźż\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 10);
}

function calculateRelevance(article: RssItem, currentKeywords: string[]): number {
  const articleKeywords = extractKeywords(article.title + " " + article.description);
  const matches = articleKeywords.filter(kw => currentKeywords.includes(kw)).length;
  return matches;
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
  } catch {
    return "";
  }
}

function createArticleUrl(article: RssItem): string {
  const params = new URLSearchParams({
    title: article.title,
    desc: article.description || "",
    content: article.content || article.description || "",
    date: article.isoDate || article.date || new Date().toISOString(),
    source: article.link || "",
    image: getImageUrl(article),
  });
  return `/artykul/?${params.toString()}`;
}

export default function RelatedArticles({
  currentTitle,
  currentKeywords = [],
  maxArticles = 4,
  feedType = "bankier"
}: RelatedArticlesProps) {
  const [articles, setArticles] = useState<RssItem[]>([]);
  const [loading, setLoading] = useState(true);

  const keywords = useMemo(() => {
    return currentKeywords.length > 0 ? currentKeywords : extractKeywords(currentTitle);
  }, [currentTitle, currentKeywords]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { fetchRss } = await import("@/lib/api");
        const data = await fetchRss(feedType, 50);
        setArticles(data.items || []);
      } catch {
        setArticles([]);
      }
      setLoading(false);
    }
    fetchArticles();
  }, [feedType]);

  const relatedArticles = useMemo(() => {
    return articles
      .filter(article => article.title !== currentTitle)
      .map(article => ({ ...article, relevance: calculateRelevance(article, keywords) }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxArticles);
  }, [articles, currentTitle, keywords, maxArticles]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(maxArticles)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-white/5 rounded-xl mb-3" />
            <div className="h-4 bg-white/5 rounded w-full mb-2" />
            <div className="h-3 bg-white/5 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-[#c9a962]/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-[#f4f4f5] flex items-center gap-3">
          <span className="w-1 h-6 bg-[#c9a962]" />
          Powiązane artykuły
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {relatedArticles.map((article, index) => (
          <motion.article
            key={article.link}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="group h-full"
          >
            <Link
              href={createArticleUrl(article)}
              className="block h-full rounded-2xl border border-white/5 bg-[#0c0d10] hover:border-[#c9a962]/30 transition-colors overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={getImageUrl(article)}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />
                <div className="absolute left-3 bottom-3 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full bg-black/60 text-[#e4e4e7]">
                  {formatDate(article.isoDate || article.date || "")}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-[14px] font-semibold text-[#f4f4f5] leading-snug line-clamp-3 group-hover:text-[#c9a962] transition-colors">
                  {article.title}
                </h4>
                <p className="text-[12px] text-[#9ca3af] line-clamp-2">
                  {article.description || "Sprawdź więcej szczegółów w artykule."}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#71717a] pt-1">
                  <span className="truncate">{article.source || "Źródło"}</span>
                  <span className="text-[#c9a962] font-medium">Czytaj</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
