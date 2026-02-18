"use client";

import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { ListSkeleton } from "../Skeleton";
import { ErrorState } from "../EmptyState";
import { getRssArticleLink } from "@/lib/slug-utils";

interface RSSItem {
  title: string;
  link: string;
  description: string;
  content: string;
  date: string;
  source: string;
  image?: string;
}

interface ArticleListProps {
  feedType: string;
  title: string;
  subtitle?: string;
  limit?: number;
}

export default function ArticleList({ feedType, title, subtitle, limit = 12 }: ArticleListProps) {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { fetchRss } = await import("@/lib/api");
        const data = await fetchRss(feedType, limit);
        setItems((data as any).items || []);
        setError(null);
      } catch {
        setError("Nie udało się załadować artykułów");
      }
      setLoading(false);
    }
    load();
  }, [feedType, limit]);

  const list = useMemo(() => items.slice(0, limit), [items, limit]);

  if (loading) return <ListSkeleton items={limit} />;
  if (error) return <ErrorState title={error} onRetry={() => location.reload()} />;
  if (!list.length) return <ErrorState title="Brak artykułów" />;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
          {subtitle && <p className="text-sm text-[#6b7280]">{subtitle}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item, idx) => (
          <ArticleCard
            key={item.title + idx}
            href={getRssArticleLink(item.title, item.link)}
            title={item.title}
            description={item.description}
            image={item.image}
            meta={new Date(item.date).toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
          />
        ))}
      </div>
    </section>
  );
}
