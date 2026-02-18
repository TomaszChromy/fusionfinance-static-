"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CategoryBadge } from "@/components/Badge";
import Calculator from "@/components/Calculator";
import Glossary from "@/components/Glossary";
import RiskMeter from "@/components/RiskMeter";
import PremiumAnalyses from "@/components/PremiumAnalyses";
import EditorialArticles from "@/components/EditorialArticles";
import PageHero from "@/components/PageHero";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketNews from "@/components/MarketNews";

export default function AnalizyPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Analizy"
          subtitle="Fundamentalne i techniczne, prognozy, rekomendacje – w stylu money.pl/bankier/obserwator."
          eyebrow="Narzędzia"
          badge="Agregator PL"
          rightSlot={<CategoryBadge category="analizy" />}
        />

        <div className="space-y-8 mt-6">
          {/* Premium Analyses Section */}
          <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-7 bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] rounded-full" />
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Ekskluzywne analizy</h2>
                <p className="text-sm text-[#6b7280]">Premium content od naszych ekspertów</p>
              </div>
            </div>
            <PremiumAnalyses />
          </div>

          {/* Editorial articles */}
          <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-7 bg-gradient-to-b from-[#a855f7] to-[#7c3aed] rounded-full" />
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Artykuły redakcyjne</h2>
                <p className="text-sm text-[#6b7280]">Treści przygotowane przez zespół FusionFinance</p>
              </div>
            </div>
            <EditorialArticles limit={6} category="analizy" />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            {/* Left column - Articles */}
            <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4 md:p-6">
              <ArticleFeedLoadMore
                feedType="analizy"
                initialCount={12}
                step={6}
                title="Analizy rynkowe"
                subtitle="Prognozy, rekomendacje, strategie"
              />
            </div>

            {/* Right column - Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#111827]">Szybki pulpit</h3>
                  <span className="text-[10px] text-[#2563eb] uppercase tracking-wide">Analizy</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-[#374151]">
                  <div className="rounded-lg border border-[#e6e8ee] bg-[#f9fafb] p-3">
                    <p className="text-[11px] text-[#6b7280]">Stopa NBP</p>
                    <p className="text-lg font-semibold">5,75%</p>
                  </div>
                  <div className="rounded-lg border border-[#e6e8ee] bg-[#f9fafb] p-3">
                    <p className="text-[11px] text-[#6b7280]">Inflacja CPI</p>
                    <p className="text-lg font-semibold">5,3%</p>
                  </div>
                  <div className="rounded-lg border border-[#e6e8ee] bg-[#f9fafb] p-3">
                    <p className="text-[11px] text-[#6b7280]">EUR/PLN</p>
                    <p className="text-lg font-semibold">4,32</p>
                  </div>
                  <div className="rounded-lg border border-[#e6e8ee] bg-[#f9fafb] p-3">
                    <p className="text-[11px] text-[#6b7280]">BTC/USD</p>
                    <p className="text-lg font-semibold">42 500</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4">
                <Calculator />
              </div>

              <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4">
                <Glossary variant="compact" />
              </div>

              <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4">
                <RiskMeter value={45} variant="gauge" />
              </div>

              <MarketNews maxItems={4} />
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
