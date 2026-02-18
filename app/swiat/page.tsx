"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import MarketNews from "@/components/MarketNews";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketBar from "@/components/MarketBar";
import RSSArticles from "@/components/RSSArticles";
import RSSFeatured from "@/components/RSSFeatured";
import TopList from "@/components/TopList";

export default function SwiatPage() {
  const topWorld = [
    { label: "S&P 500", value: "+0.31%" },
    { label: "Nasdaq", value: "+0.44%" },
    { label: "DAX", value: "-0.17%" },
  ];
  const topCommod = [
    { label: "Złoto", value: "-0.12%" },
    { label: "Ropa Brent", value: "+0.25%" },
    { label: "Miedź", value: "+0.18%" },
  ];
  const topFx = [
    { label: "EUR/USD", value: "+0.08%" },
    { label: "USD/JPY", value: "-0.12%" },
    { label: "GBP/USD", value: "+0.05%" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <MarketBar />
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Świat"
          subtitle="Globalne rynki, makro, surowce, geopolityka – wiadomości z głównych agencji i serwisów finansowych."
          eyebrow="Rynki globalne"
          badge="Live"
        />
        {/* Hero: main story + snapshot rynków globalnych */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-white/5">
              <span className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[var(--danger)] text-black rounded">
                Pilne
              </span>
              <span className="text-[11px] text-[var(--muted)]">Global</span>
            </div>
            <div className="p-4 md:p-6">
              <RSSFeatured
                feedType="swiat"
                limit={5}
                title="Analiza dnia (Świat)"
                description="Najważniejszy materiał globalny"
                eyebrow=""
              />
            </div>
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text)]">Snapshot globalny</h3>
            <TopList title="Indeksy" items={topWorld} />
            <TopList title="Surowce" items={topCommod} />
            <TopList title="Waluty" items={topFx} />
          </div>
        </div>

        {/* Kolumny newsów */}
        <div className="grid gap-6 lg:grid-cols-3 mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Makro & Geopolityka</h2>
            <RSSArticles feedType="swiat" limit={5} showImage />
            <ArticleFeedLoadMore feedType="swiat" initialCount={6} step={3} />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Rynki & Spółki</h2>
            <RSSArticles feedType="gielda" limit={5} showImage />
            <ArticleFeedLoadMore feedType="gielda" initialCount={6} step={3} />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Surowce & Energia</h2>
            <RSSArticles feedType="biznes" limit={5} showImage />
            <ArticleFeedLoadMore feedType="biznes" initialCount={6} step={3} />
          </div>
        </div>

        {/* Dane rynkowe + reklama */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Dane rynkowe (Global)</h2>
            <TopList title="Indeksy" items={topWorld} />
            <div className="h-4" />
            <TopList title="FX Majors" items={topFx} />
          </div>
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-6 text-center text-sm text-[var(--muted)]">
            <p className="text-[var(--text)] font-semibold mb-2">Miejsce na Twoją reklamę</p>
            <p>Kontakt: tomasz.chromy@outlook.com</p>
          </div>
        </div>

        {/* Dłuższe listy + market news */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-10">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <ArticleFeedLoadMore
              feedType="swiat"
              initialCount={12}
              step={6}
              title="Artykuły ze świata"
              subtitle="Makro, surowce, geopolityka"
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
