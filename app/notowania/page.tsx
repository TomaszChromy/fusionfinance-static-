"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnifiedCategoryLayout from "@/components/UnifiedCategoryLayout";
import LiveIndicator from "@/components/LiveIndicator";
import { InfoTooltip } from "@/components/Tooltip";
import MarketBar from "@/components/MarketBar";
import TopList from "@/components/TopList";
import RSSArticles from "@/components/RSSArticles";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";

export default function NotowaniaPage() {
  const topIndices = [
    { label: "WIG20", value: "+0.48%", direction: "up" },
    { label: "S&P 500", value: "+0.31%", direction: "up" },
    { label: "DAX", value: "-0.17%", direction: "down" },
  ];
  const topFx = [
    { label: "EUR/PLN", value: "+0.29%", direction: "up" },
    { label: "USD/PLN", value: "-0.22%", direction: "down" },
    { label: "BTC/USD", value: "+1.59%", direction: "up" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <MarketBar />
      <Navbar />
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Notowania"
          subtitle="GPW, globalne indeksy, FX, krypto – hub notowań jak w money.pl/bankier.pl."
          eyebrow="Rynki"
          badge="Agregator PL"
        />
        {/* Hero + snapshot */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 bg-gradient-to-b from-[var(--accent)] to-[var(--gold-dark)] rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text)]">Artykuły</h2>
                  <p className="text-xs text-[var(--muted)] mt-0.5">Aktualne treści z kategorii giełda/notowania</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <LiveIndicator label="Na żywo" />
                <InfoTooltip content="80 artykułów, 12 na stronę" />
              </div>
            </div>
            <ArticleFeedLoadMore feedType="gielda" initialCount={12} step={6} title="" subtitle="" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
              <h3 className="text-sm font-semibold text-[var(--text)] mb-3">Snapshot</h3>
              <TopList title="Indeksy" items={topIndices} />
              <div className="h-3" />
              <TopList title="FX/Krypto" items={topFx} />
            </div>
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-4 text-center text-sm text-[var(--muted)]">
              <p className="text-[var(--text)] font-semibold">Miejsce na Twoją reklamę</p>
              <p>Slot 300x250 / 336x280</p>
            </div>
          </div>
        </div>

        {/* Dodatkowe listy + rynki */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <RSSArticles feedType="gielda" limit={6} showImage />
            <UnifiedCategoryLayout feedType="gielda" totalArticles={80} articlesPerPage={12} />
          </div>
          <div className="space-y-4">
            <LiveIndicator label="Rynek" />
            <InfoTooltip content="Agregator notowań w przygotowaniu" />
            <RSSArticles feedType="krypto" limit={4} showImage />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
