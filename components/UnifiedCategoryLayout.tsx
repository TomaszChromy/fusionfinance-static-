"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import FavoriteButton from "./FavoriteButton";
import { ListSkeleton } from "./Skeleton";
import { ErrorState } from "./EmptyState";
import { SourceAvatar } from "./Avatar";

interface RSSItem {
  title: string;
  link: string;
  description: string;
  content: string;
  date: string;
  source: string;
  category?: string;
  image?: string;
}

interface UnifiedCategoryLayoutProps {
  feedType?: string;
  totalArticles?: number;
  articlesPerPage?: number;
}

// Obrazy tematyczne (skrócona wersja)
const themeImages: Record<string, string[]> = {
  default: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
  ],
};

function getFallbackImage(index: number, title: string): string {
  const images = themeImages.default;
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[(hash + index) % images.length];
}

function getImageForArticle(index: number, title: string, originalImage?: string): string {
  if (originalImage && originalImage.startsWith("http")) {
    return originalImage;
  }
  return getFallbackImage(index, title);
}

function formatPolishDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "przed chwilą";
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours}h temu`;
    if (diffDays < 7) return `${diffDays}d temu`;

    return date.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
  } catch {
    return dateString;
  }
}

function createArticleUrl(article: RSSItem, index: number): string {
  const imageUrl = getImageForArticle(index, article.title, article.image);
  const params = new URLSearchParams({
    title: article.title,
    desc: article.description,
    content: article.content || article.description,
    date: article.date,
    source: article.link,
    image: imageUrl,
  });
  return `/artykul/?${params.toString()}`;
}

export default function UnifiedCategoryLayout({
  feedType = "bankier",
  totalArticles = 80,
  articlesPerPage = 12,
}: UnifiedCategoryLayoutProps) {
  const [allArticles, setAllArticles] = useState<RSSItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      try {
        const { fetchRss } = await import("@/lib/api");
        const data = await fetchRss(feedType, totalArticles);
        setAllArticles((data as any).items || []);
        setError(null);
      } catch {
        setError("Nie udało się załadować artykułów");
      }
      setLoading(false);
    }
    loadArticles();
  }, [feedType, totalArticles]);

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage;
    return allArticles.slice(start, start + articlesPerPage);
  }, [allArticles, currentPage, articlesPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return <ListSkeleton items={articlesPerPage} showAvatar />;
  }

  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  if (allArticles.length === 0) {
    return (
      <div className="text-center py-[34px] text-[#71717a]">
        <p>Brak artykułów do wyświetlenia</p>
      </div>
    );
  }

  // Podziel artykuły: 1 hero + 2 featured + reszta w gridzie
  const heroArticle = currentArticles[0];
  const featuredArticles = currentArticles.slice(1, 3);
  const gridArticles = currentArticles.slice(3);

  return (
    <div ref={containerRef} className="space-y-8">
      {/* HERO ARTICLE - inspiracja Washington Post */}
      {heroArticle && (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group relative overflow-hidden rounded-3xl bg-[#0c0d10] border border-white/5 hover:border-[#c9a962]/30 transition-all duration-300"
        >
          <Link href={createArticleUrl(heroArticle, 0)} className="block">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src={getImageForArticle(0, heroArticle.title, heroArticle.image)}
                alt={heroArticle.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-13">
                <div className="flex items-center gap-3 mb-5">
                  <SourceAvatar source={heroArticle.source || "news"} size="sm" />
                  <span className="text-[12px] text-[#e4d4a5] uppercase tracking-[0.15em]">
                    {formatPolishDate(heroArticle.date)}
                  </span>
                </div>
                <h2 className="font-serif text-[28px] lg:text-[42px] font-bold text-white leading-tight mb-5 group-hover:text-[#e4d4a5] transition-colors duration-300">
                  {heroArticle.title}
                </h2>
                <p className="text-[16px] lg:text-[18px] text-[#d4d4d8] leading-relaxed line-clamp-2 max-w-4xl">
                  {heroArticle.description}
                </p>
              </div>
            </div>
          </Link>
        </motion.article>
      )}

      {/* FEATURED ARTICLES - inspiracja Interia.pl (2 kolumny) */}
      {featuredArticles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {featuredArticles.map((article, index) => {
            const imageUrl = getImageForArticle(index + 1, article.title, article.image);
            return (
              <motion.article
                key={article.link + index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-[#0c0d10] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c9a962]/30 hover:shadow-[0_12px_40px_rgba(201,169,98,0.08)] transition-all duration-300"
              >
                <Link href={createArticleUrl(article, index + 1)} className="block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <SourceAvatar source={article.source || "news"} size="xs" />
                      <span className="text-[11px] text-[#a1a1aa] uppercase tracking-[0.1em]">
                        {formatPolishDate(article.date)}
                      </span>
                    </div>
                    <h3 className="font-serif text-[20px] lg:text-[22px] font-semibold text-[#f4f4f5] leading-snug mb-3 group-hover:text-[#c9a962] transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-relaxed line-clamp-2 group-hover:text-[#d4d4d8] transition-colors duration-200">
                      {article.description}
                    </p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* GRID ARTICLES - inspiracja Bankier.pl (3 kolumny) */}
      {gridArticles.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {gridArticles.map((article, index) => {
              const imageUrl = getImageForArticle(index + 3, article.title, article.image);
              return (
                <motion.article
                  key={article.link + index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group bg-[#0c0d10] border border-white/5 rounded-xl overflow-hidden hover:border-[#c9a962]/30 hover:shadow-[0_8px_30px_rgba(201,169,98,0.06)] transition-all duration-300 flex flex-col"
                >
                  <Link href={createArticleUrl(article, index + 3)} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-2 text-[10px] text-[#a1a1aa] uppercase tracking-[0.1em]">
                        <SourceAvatar source={article.source || "news"} size="xs" />
                        <span>{formatPolishDate(article.date)}</span>
                      </div>
                      <h3 className="font-serif text-[16px] font-semibold text-[#f4f4f5] leading-snug mb-2 group-hover:text-[#c9a962] transition-colors duration-200 line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="text-[13px] text-[#a1a1aa] leading-relaxed line-clamp-2 mb-3 group-hover:text-[#d4d4d8] transition-colors duration-200">
                        {article.description}
                      </p>
                      <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] text-[#c9a962] font-medium flex items-center gap-1">
                          Czytaj
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <FavoriteButton
                          article={{
                            title: article.title,
                            description: article.description,
                            image: imageUrl,
                            source: article.source,
                            date: formatPolishDate(article.date),
                          }}
                          size="sm"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {/* PAGINATION */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

