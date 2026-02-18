"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import MarketNews from "@/components/MarketNews";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketBar from "@/components/MarketBar";
import TopList from "@/components/TopList";
import RSSFeatured from "@/components/RSSFeatured";
import RSSArticles from "@/components/RSSArticles";

export default function PolskaPage() {
  const topIndices = [
    { label: "WIG20", value: "+0.48%", direction: "up" },
    { label: "mWIG40", value: "-0.35%", direction: "down" },
    { label: "sWIG80", value: "+0.24%", direction: "up" },
  ];
  const topFx = [
    { label: "EUR/PLN", value: "+0.29%", direction: "up" },
    { label: "USD/PLN", value: "-0.22%", direction: "down" },
    { label: "CHF/PLN", value: "+0.10%", direction: "up" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <MarketBar />
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Polska"
          subtitle="Wiadomości gospodarcze z Polski: GPW, makro NBP, budżet, inflacja, stopy procentowe."
          eyebrow="Ekonomia i rynki PL"
          badge="Live"
          rightSlot={<CategoryBadge category="rynki" />}
        />

        {/* Hero: main story + snapshot rynku */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-white/5">
              <span className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[var(--danger)] text-black rounded">
                Pilne
              </span>
              <span className="text-[11px] text-[var(--muted)]">Rynek PL</span>
            </div>
            <div className="p-4 md:p-6">
              <RSSFeatured
                feedType="polska"
                limit={5}
                title="Analiza dnia (PL)"
                description="Najważniejszy materiał z rynku polskiego"
                eyebrow=""
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text)]">Snapshot rynku PL</h3>
            <TopList title="Indeksy" items={topIndices} />
            <TopList title="Waluty" items={topFx} />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a className="px-3 py-2 rounded-lg border border-[var(--border)] bg-white/5 text-center hover:border-[var(--accent)] transition-colors" href="/notowania">
                Przejdź do notowań
              </a>
              <a className="px-3 py-2 rounded-lg border border-[var(--border)] bg-white/5 text-center hover:border-[var(--accent)] transition-colors" href="/gielda">
                Otwórz screener
              </a>
            </div>
          </div>
        </div>

        {/* Kolumny newsów */}
        <div className="grid gap-6 lg:grid-cols-3 mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Gospodarka & Makro</h2>
            <RSSArticles feedType="polska" limit={5} showImage />
            <ArticleFeedLoadMore feedType="polska" initialCount={6} step={3} />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Giełda & Spółki</h2>
            <RSSArticles feedType="gielda" limit={5} showImage />
            <ArticleFeedLoadMore feedType="gielda" initialCount={6} step={3} />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Twoje finanse</h2>
            <RSSArticles feedType="biznes" limit={5} showImage />
            <ArticleFeedLoadMore feedType="biznes" initialCount={6} step={3} />
          </div>
        </div>

        {/* Dane rynkowe + reklama */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Dane rynkowe (PL)</h2>
            <TopList title="Indeksy GPW" items={[{ label: "WIG20", value: "+0.48%", direction: "up" }, { label: "mWIG40", value: "-0.35%", direction: "down" }, { label: "sWIG80", value: "+0.24%", direction: "up" }]} />
            <div className="h-4" />
            <TopList title="Sektory" items={[{ label: "Banki", value: "-0.31%", direction: "down" }, { label: "Energetyka", value: "+0.65%", direction: "up" }, { label: "Gaming", value: "+0.94%", direction: "up" }]} />
          </div>
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-6 text-center text-sm text-[var(--muted)]">
            <p className="text-[var(--text)] font-semibold mb-2">Miejsce na Twoją reklamę</p>
            <p>Skontaktuj się z nami, aby zarezerwować slot.</p>
          </div>
        </div>

        {/* Sidebar news + MarketNews */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <ArticleFeedLoadMore
              feedType="polska"
              initialCount={12}
              step={6}
              title="Najnowsze artykuły"
              subtitle="Świeże wiadomości gospodarcze z Polski"
            />
          </div>
          <div className="space-y-4">
            <MarketNews maxItems={6} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
