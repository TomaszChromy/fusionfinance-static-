"use client";

import { useEffect, useState } from "react";
import { CardSkeleton } from "../Skeleton";
import EmptyState, { ErrorState } from "../EmptyState";
import { ArticleCard } from "./ArticleCard";
import type { RssItem } from "@/types/rss";
import { fetchRss } from "@/lib/api";
import { getRssArticleLink } from "@/lib/slug-utils";

interface Props {
  feedType: string;
  initialCount?: number;
  step?: number;
  title?: string;
  subtitle?: string;
}

export default function ArticleFeedLoadMore({
  feedType,
  initialCount = 12,
  step = 6,
  title,
  subtitle,
}: Props) {
  const [items, setItems] = useState<RssItem[]>([]);
  const [visible, setVisible] = useState(initialCount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchRss(feedType, 50);
        setItems(data.items || []);
        setError(null);
      } catch {
        setError("Nie udało się załadować artykułów");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [feedType]);

  const list = items.slice(0, visible);

  if (loading) return <CardSkeleton showImage />;
  if (error) return <ErrorState title={error} />;
  if (!items.length) return <EmptyState title="Brak artykułów" description="Spróbuj ponownie później" />;

  return (
    <div className="space-y-4">
      {(title || subtitle) && (
        <div>
          {title && <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>}
          {subtitle && <p className="text-sm text-[#6b7280]">{subtitle}</p>}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((item, idx) => (
          <ArticleCard
            key={(item.link || item.title) + idx}
            href={getRssArticleLink(item.title, item.link || "")}
            title={item.title}
            description={item.description || item.contentSnippet || ""}
            image={item.image || item.enclosure?.url}
            meta={new Date(item.isoDate || item.date || Date.now()).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
          />
        ))}
      </div>
      {visible < items.length && (
        <button
          type="button"
          className="w-full rounded-xl border border-[#e6e8ee] bg-white py-3 text-sm font-medium text-[#2563eb] hover:bg-[#f0f4ff] transition-colors"
          onClick={() => setVisible(Math.min(items.length, visible + step))}
        >
          Załaduj więcej
        </button>
      )}
    </div>
  );
}
