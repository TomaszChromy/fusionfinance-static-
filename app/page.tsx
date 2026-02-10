"use client";

import { motion } from "framer-motion";

// Layout
import { Navbar, Footer } from "@/components/layout";

// Navigation
import { BreakingNews } from "@/components/navigation";

// Hero
import { RSSFeatured } from "@/components/hero";
import Breadcrumbs from "@/components/Breadcrumbs";

// News
import { MarketNews } from "@/components/news";
import ArticlesPaginated from "@/components/ArticlesPaginated";

// Sidebar
import {
  MarketMoodIndicator,
  DailyQuote,
  LiveIndicator,
  SocialProof,
  QuickActions,
} from "@/components/sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />
      <BreakingNews />

      <div className="phi-shell">

        {/* SEO H1 - wizualnie ukryty ale dostępny dla SEO */}
        <h1 className="sr-only">FusionFinance - Portal Finansowy z Aktualnymi Wiadomościami z Giełdy, Kryptowalut i Rynków</h1>
        <Breadcrumbs />

        {/* HERO - Wyróżnione artykuły */}
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">Wyróżnione artykuły</h2>
          <RSSFeatured />
        </section>

        {/* MAIN CONTENT */}
        <motion.section
          initial={{ opacity: 0, y: 21 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="phi-stack"
          style={{ marginTop: "var(--space-55)", gap: "var(--space-21)" }}
        >
          <section aria-labelledby="news-heading" className="phi-stack" style={{ gap: "var(--space-13)" }}>
            <div className="flex items-center justify-between pb-4 border-b border-[#c9a962]/20" style={{ paddingBottom: "var(--space-8)" }}>
              <div className="flex items-center gap-3" style={{ gap: "var(--space-8)" }}>
                <div className="w-1 h-7 bg-gradient-to-b from-[#c9a962] to-[#9a7b3c] rounded-full" />
                <div>
                  <h2 id="news-heading" className="text-xl font-serif font-medium text-[#f4f4f5]">Artykuły</h2>
                </div>
              </div>
              <LiveIndicator label="Na żywo" />
            </div>

            <div className="phi-section">
              <ArticlesPaginated articlesPerPage={64} />
            </div>

            <DailyQuote />

          </section>
        </motion.section>

        {/* Market News - Flash News */}
        <motion.section
          aria-labelledby="flash-news-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: "var(--space-55)" }}
        >
          <h2 id="flash-news-heading" className="sr-only">Szybkie wiadomości</h2>
          <MarketNews maxItems={5} />
        </motion.section>

        {/* Social Proof Section - zwiększony margines */}
        <motion.section
          aria-labelledby="stats-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: "var(--space-89)", marginBottom: "var(--space-34)" }}
        >
          <h2 id="stats-heading" className="sr-only">Statystyki portalu</h2>
          <SocialProof variant="compact" />
        </motion.section>
      </div>

      <Footer />

      {/* Quick Actions FAB */}
      <QuickActions />
    </main>
  );
}
