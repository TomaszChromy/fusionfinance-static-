"use client";

import { motion } from "framer-motion";

// Layout
import { Navbar, Footer } from "@/components/layout";

// Navigation
import { BreakingNews } from "@/components/navigation";

// Components
import Breadcrumbs from "@/components/Breadcrumbs";
import UnifiedCategoryLayout from "@/components/UnifiedCategoryLayout";
import LiveIndicator from "@/components/LiveIndicator";
import { InfoTooltip } from "@/components/Tooltip";

// Sidebar
import {
  DailyQuote,
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

        {/* MAIN CONTENT */}
        <motion.section
          initial={{ opacity: 0, y: 21 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="phi-stack"
          style={{ marginTop: "var(--space-34)", gap: "var(--space-21)" }}
        >
          <section aria-labelledby="news-heading" className="phi-stack" style={{ gap: "var(--space-13)" }}>
            <div className="phi-section shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between mb-[26px] pb-[16px] border-b border-[#c9a962]/20" style={{ marginBottom: "var(--space-21)", paddingBottom: "var(--space-13)" }}>
                <div className="flex items-center gap-3" style={{ gap: "var(--space-8)" }}>
                  <div className="w-1 h-7 bg-gradient-to-b from-[#c9a962] to-[#9a7b3c] rounded-full" />
                  <div>
                    <h2 id="news-heading" className="text-lg font-serif font-medium text-[#f4f4f5]">Najnowsze artykuły</h2>
                    <p className="text-xs text-[#71717a] mt-0.5">Layout inspirowany Interia.pl, Bankier.pl i Washington Post</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <LiveIndicator label="Na żywo" />
                  <InfoTooltip content="80 artykułów, 12 na stronę" />
                </div>
              </div>

              <UnifiedCategoryLayout feedType="all" totalArticles={80} articlesPerPage={12} />
            </div>

            <DailyQuote />

          </section>
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
