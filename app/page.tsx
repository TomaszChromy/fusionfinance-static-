"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { BreakingNews } from "@/components/navigation";
import MarketNews from "@/components/MarketNews";
import RSSFeatured from "@/components/RSSFeatured";
import RSSArticles from "@/components/RSSArticles";
import ArticleList from "@/components/articles/ArticleList";
import { DailyQuote, SocialProof, QuickActions } from "@/components/sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Navbar />
      <BreakingNews />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <h1 className="sr-only">FusionFinance - Portal finansowy</h1>

        {/* Hero: wyróżnione artykuły + sidebar */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-[#e6e8ee] p-4 md:p-6">
            <RSSFeatured
              feedType="all"
              limit={6}
              title="Top wiadomości"
              description="Najważniejsze informacje ze światowych i lokalnych rynków"
              eyebrow="Polecane"
            />
          </div>

          <div className="space-y-4">
            <MarketNews maxItems={6} />
            <DailyQuote />
          </div>
        </motion.section>

        {/* Najnowsze */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-[#e6e8ee] p-4 md:p-6 mt-10"
        >
          <ArticleList
            feedType="all"
            title="Najnowsze artykuły"
            subtitle="Świeże treści z wszystkich kategorii"
            limit={9}
          />
        </motion.section>

        {/* Sekcja regionalna */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-10"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-[#e6e8ee] p-4 md:p-6">
            <RSSArticles feedType="polska" limit={8} showImage />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#e6e8ee] p-4 md:p-6">
            <RSSArticles feedType="gielda" limit={6} showImage={false} />
          </div>
        </motion.section>

        <motion.section
          aria-labelledby="stats-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-12 mb-14"
        >
          <h2 id="stats-heading" className="sr-only">Statystyki portalu</h2>
          <SocialProof variant="compact" />
        </motion.section>
      </div>

      <Footer />
      <QuickActions />
    </main>
  );
}
