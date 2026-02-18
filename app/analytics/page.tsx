"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";

interface Stats {
  range: string;
  period: {
    start: string;
    end: string;
  };
  totalViews: number;
  uniqueUsers: number;
  totalArticleViews: number;
  avgDuration: number;
  bounceRate: number;
  topArticles: Array<{
    articleId: string;
    title: string;
    views: number;
  }>;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [range, setRange] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analytics/stats?range=${range}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [range]);

  const rangeOptions = [
    { value: "1d", label: "Ostatni dzień" },
    { value: "7d", label: "Ostatnie 7 dni" },
    { value: "30d", label: "Ostatnie 30 dni" },
    { value: "90d", label: "Ostatnie 90 dni" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />

      <div className="phi-shell" style={{ paddingTop: "var(--space-55)", paddingBottom: "var(--space-55)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-[var(--accent)] to-[#1d4ed8] rounded-full" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-medium text-[#f4f4f5]">
                Analityka
              </h1>
              <p className="text-lg text-[#71717a] mt-2">
                Metryki i statystyki portalu
              </p>
            </div>
          </div>
        </motion.div>

        {/* Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setRange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                range === option.value
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white/5 text-[#a1a1aa] hover:bg-white/10 hover:text-[#f4f4f5]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#71717a]">Ładowanie statystyk...</p>
          </div>
        ) : stats ? (
          <>
            {/* Key Metrics Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="phi-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              style={{ gap: "var(--space-21)", marginBottom: "var(--space-34)" }}
            >
              {/* Total Views */}
              <div className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Wyświetlenia
                  </h3>
                  <span className="text-2xl">👁️</span>
                </div>
                <div className="text-3xl font-serif font-medium text-[#f4f4f5]">
                  {stats.totalViews.toLocaleString()}
                </div>
                <p className="text-xs text-[#71717a] mt-2">
                  Całkowita liczba wyświetleń
                </p>
              </div>

              {/* Unique Users */}
              <div className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Użytkownicy
                  </h3>
                  <span className="text-2xl">👤</span>
                </div>
                <div className="text-3xl font-serif font-medium text-[#f4f4f5]">
                  {stats.uniqueUsers.toLocaleString()}
                </div>
                <p className="text-xs text-[#71717a] mt-2">
                  Unikalni użytkownicy
                </p>
              </div>

              {/* Article Views */}
              <div className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Artykuły
                  </h3>
                  <span className="text-2xl">📰</span>
                </div>
                <div className="text-3xl font-serif font-medium text-[#f4f4f5]">
                  {stats.totalArticleViews.toLocaleString()}
                </div>
                <p className="text-xs text-[#71717a] mt-2">
                  Wyświetlenia artykułów
                </p>
              </div>

              {/* Bounce Rate */}
              <div className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    Bounce Rate
                  </h3>
                  <span className="text-2xl">📊</span>
                </div>
                <div className="text-3xl font-serif font-medium text-[#f4f4f5]">
                  {stats.bounceRate.toFixed(1)}%
                </div>
                <p className="text-xs text-[#71717a] mt-2">
                  Procent odbicia
                </p>
              </div>
            </motion.div>

            {/* Average Duration */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="phi-section"
              style={{ marginBottom: "var(--space-34)" }}
            >
              <h3 className="text-sm font-semibold text-[#f4f4f5] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⏱️</span> Średni czas spędzony
              </h3>
              <div className="text-4xl font-serif font-medium text-[var(--accent)]">
                {(stats.avgDuration / 60).toFixed(1)} min
              </div>
              <p className="text-xs text-[#71717a] mt-2">
                Średnia czas użytkownika na stronie
              </p>
            </motion.div>

            {/* Top Articles */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 hover:border-[var(--accent)]/30 transition-colors"
            >
              <h3 className="text-sm font-semibold text-[#f4f4f5] uppercase tracking-wider mb-6 flex items-center gap-2">
                <span>🔝</span> Top Artykuły
              </h3>

              {stats.topArticles.length > 0 ? (
                <div className="space-y-4">
                  {stats.topArticles.map((article, index) => (
                    <motion.div
                      key={article.articleId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1d4ed8] text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#f4f4f5] truncate">
                            {article.title}
                          </p>
                          <p className="text-xs text-[#71717a] mt-1">
                            {article.articleId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-serif font-medium text-[var(--accent)]">
                          {article.views}
                        </p>
                        <p className="text-xs text-[#71717a]">wyświetleń</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-[#71717a] text-sm">Brak danych o artykułach</p>
              )}
            </motion.div>

            {/* Date Range Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-[#71717a] mt-8 text-center"
            >
              Dane z okresu: {new Date(stats.period.start).toLocaleDateString("pl-PL")} -{" "}
              {new Date(stats.period.end).toLocaleDateString("pl-PL")}
            </motion.p>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#f87171]">Błąd podczas ładowania statystyk</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
