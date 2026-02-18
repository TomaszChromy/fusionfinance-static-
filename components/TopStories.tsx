"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TagList from "./TagList";
import { getApiUrl } from "@/lib/api";
import type { RssItem } from "@/types/rss";

interface Story {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImage?: string;
  category?: string;
  publishedAt: string;
  source?: string;
  author?: string;
  tags?: string[];
}

export default function TopStories({ limit = 4, className = "" }: { limit?: number; className?: string }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const apiUrl = getApiUrl("articles", { limit });
        const res = await fetch(apiUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`API articles error: ${res.status}`);
        const data = await res.json();
        if (mounted && Array.isArray(data.items)) {
          setStories(data.items);
        }
      } catch {
        // Fallback na RSS (all) gdy API articles nie działa na statycznym hostingu
        try {
          const { fetchRss } = await import("@/lib/api");
          const rss = await fetchRss("all", limit);
          const items: RssItem[] = rss.items || [];
          if (mounted) {
            setStories(
              items.map((item) => ({
                id: item.link || item.title,
                slug: "",
                title: item.title,
                summary: item.description || item.contentSnippet || "",
                coverImage: item.image || item.enclosure?.url,
                category: item.category || "RSS",
                publishedAt: item.isoDate || item.date || new Date().toISOString(),
                source: item.source || item.link || "RSS",
              }))
            );
          }
        } catch (fallbackErr) {
          console.error("TopStories RSS fallback error:", fallbackErr);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [limit]);

  const skeleton = (
    <div className={`grid gap-4 lg:grid-cols-[1.618fr_1fr] ${className}`}>
      <div className="h-56 lg:h-72 bg-white/5 rounded-xl animate-pulse" />
      <div className="grid grid-rows-2 gap-4">
        <div className="h-full bg-white/5 rounded-xl animate-pulse" />
        <div className="h-full bg-white/5 rounded-xl animate-pulse" />
      </div>
    </div>
  );

  if (loading) return skeleton;
  if (!stories.length) return null;

  const [main, ...rest] = stories;

  return (
    <div className={`grid gap-4 lg:grid-cols-[1.618fr_1fr] ${className}`}>
      {/* Main story */}
      <Link href={`/artykuly/${main.slug}`} className="group">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-56 lg:h-72 rounded-2xl overflow-hidden bg-white border border-[#e6e8ee] shadow-sm"
        >
          {main.coverImage && (
            <Image
              src={main.coverImage}
              alt={main.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-600"
              sizes="(max-width: 1024px) 100vw, 70vw"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-white uppercase tracking-wide drop-shadow">
              <span>{main.category || "Analiza"}</span>
              <span className="w-1 h-1 rounded-full bg-[#c9a962]" />
              <span>{new Date(main.publishedAt).toLocaleDateString("pl-PL")}</span>
              {main.source && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#c9a962]" />
                  <span>{main.source}</span>
                </>
              )}
            </div>
            <h3 className="text-xl lg:text-2xl font-serif text-white font-semibold leading-tight group-hover:text-[#c9a962] transition-colors drop-shadow">
              {main.title}
            </h3>
            <p className="text-sm text-white/85 line-clamp-2 lg:line-clamp-3 drop-shadow">{main.summary}</p>
            {main.author && (
              <p className="text-[11px] text-white/70">Autor: {main.author}</p>
            )}
            <TagList tags={main.tags} />
          </div>
        </motion.article>
      </Link>

      {/* Secondary stories */}
      <div className="grid grid-rows-2 gap-4">
        {rest.slice(0, 2).map((story, idx) => (
          <Link href={`/artykuly/${story.slug}`} key={story.slug} className="group h-full">
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * (idx + 1) }}
              className="relative h-full rounded-2xl overflow-hidden bg-white border border-[#e6e8ee] shadow-sm"
            >
              {story.coverImage && (
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-600"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end gap-2">
                <div className="flex items-center gap-2 text-[10px] text-[#c9a962] uppercase tracking-wide">
                  <span>{story.category || "Analiza"}</span>
                  <span className="w-1 h-1 rounded-full bg-[#c9a962]" />
                  <span>{new Date(story.publishedAt).toLocaleDateString("pl-PL")}</span>
                  {story.source && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#c9a962]" />
                      <span>{story.source}</span>
                    </>
                  )}
                </div>
                <h4 className="text-sm lg:text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#c9a962] transition-colors">
                  {story.title}
                </h4>
                {story.author && (
                  <p className="text-[10px] text-white/70">Autor: {story.author}</p>
                )}
                <TagList tags={story.tags} />
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </div>
  );
}
