"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchRss } from "@/lib/api";
import type { RssItem } from "@/types/rss";

interface NewsItem {
  title: string;
  link: string;
  source: string;
  date: string;
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "teraz";
  if (diffMin < 60) return `${diffMin} min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} godz.`;
  return `${Math.floor(diffHours / 24)} dni`;
}

interface NewsTickerProps {
  maxItems?: number;
  speed?: number;
  className?: string;
}

export default function NewsTicker({
  maxItems = 10,
  speed = 40,
  className = "",
}: NewsTickerProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await fetchRss("all", maxItems);
        const parsed = (data.items || []).slice(0, maxItems).map((item: RssItem) => ({
          title: item.title,
          link: item.link || "#",
          source: item.source || "RSS",
          date: item.isoDate || item.date || new Date().toISOString(),
        }));
        setNews(parsed);
      } catch {
        setNews([]);
      }
    }
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [maxItems]);

  if (!isClient) {
    return <div className={`bg-[#0c0d10] border border-white/5 rounded-xl h-[80px] ${className}`} />;
  }

  if (news.length === 0) {
    return null;
  }

  const duplicatedNews = [...news, ...news];

  return (
    <div className={`bg-[#0c0d10] border border-white/5 rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#c9a962] rounded-full animate-pulse" />
          <span className="text-xs font-medium text-[#f4f4f5] uppercase tracking-wider">Breaking News</span>
        </div>
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="text-[10px] text-[#71717a] hover:text-[#c9a962] transition-colors"
        >
          {isPaused ? "▶ Wznów" : "⏸ Pauza"}
        </button>
      </div>

      <div className="py-3 overflow-hidden">
        <motion.div
          animate={{ x: isPaused ? 0 : "-50%" }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-8 whitespace-nowrap px-4"
        >
          {duplicatedNews.map((item, index) => (
            <a
              key={`${item.link}-${index}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="px-2 py-0.5 bg-[#c9a962]/20 text-[#c9a962] text-[10px] font-medium rounded">
                {item.source}
              </span>
              <span className="text-sm text-[#f4f4f5] group-hover:text-[#c9a962] transition-colors max-w-[300px] truncate">
                {item.title}
              </span>
              <span className="text-[10px] text-[#52525b]">{formatTimeAgo(item.date)}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
