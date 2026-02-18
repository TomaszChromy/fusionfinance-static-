"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import { CryptoGrid } from "@/components/CryptoPrice";
import Glossary from "@/components/Glossary";
import MarketMoodIndicator from "@/components/MarketMoodIndicator";
import PriceComparison from "@/components/PriceComparison";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketNews from "@/components/MarketNews";
import MarketBar from "@/components/MarketBar";
import RSSFeatured from "@/components/RSSFeatured";
import RSSArticles from "@/components/RSSArticles";
import TopList from "@/components/TopList";

export default function CryptoPage() {
  const topCoins = [
    { label: "BTC", value: "+1.59%" },
    { label: "ETH", value: "+1.12%" },
    { label: "SOL", value: "+0.84%" },
    { label: "XRP", value: "-0.22%" },
    { label: "ADA", value: "+0.45%" },
  ];
  const topPairs = [
    { label: "BTC/USD", value: "+1.59%" },
    { label: "ETH/BTC", value: "-0.28%" },
    { label: "SOL/USDT", value: "+0.74%" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <MarketBar />
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Kryptowaluty"
          subtitle="BTC, ETH, DeFi, NFT – wiadomości, kursy i nastroje rynku w jednym miejscu."
          eyebrow="Crypto hub"
          badge="Live"
          rightSlot={<CategoryBadge category="crypto" />}
        />

        <div className="space-y-8 mt-6">
          {/* Hero + snapshot */}
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-white/5">
                <span className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[var(--danger)] text-black rounded">
                  Pilne
                </span>
                <span className="text-[11px] text-[var(--muted)]">Crypto</span>
              </div>
              <div className="p-4 md:p-6">
                <RSSFeatured
                  feedType="crypto"
                  limit={5}
                  title="Analiza dnia (Crypto)"
                  description="Najważniejszy materiał z rynku krypto"
                  eyebrow=""
                />
              </div>
            </div>
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--text)]">Snapshot krypto</h3>
              <TopList title="Top market cap" items={topCoins} />
              <TopList title="Parowanie" items={topPairs} />
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-4 text-center text-sm text-[var(--muted)]">
                <p className="text-[var(--text)] font-semibold mb-1">Miejsce na Twoją reklamę</p>
                <p>Kontakt: tomasz.chromy@outlook.com</p>
              </div>
            </div>
          </div>

          {/* Kolumny newsów */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">BTC/ETH</h2>
              <RSSArticles feedType="crypto" limit={5} showImage />
              <ArticleFeedLoadMore feedType="crypto" initialCount={6} step={3} />
            </div>
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">DeFi / NFT</h2>
              <RSSArticles feedType="krypto" limit={5} showImage />
              <ArticleFeedLoadMore feedType="krypto" initialCount={6} step={3} />
            </div>
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">Regulacje & Bezpieczeństwo</h2>
              <RSSArticles feedType="biznes" limit={5} showImage />
              <ArticleFeedLoadMore feedType="biznes" initialCount={6} step={3} />
            </div>
          </div>

          {/* Dane rynkowe + narzędzia */}
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-gradient-to-b from-[var(--accent)] to-[var(--gold-dark)] rounded-full" />
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--text)]">Kursy kryptowalut</h2>
                    <p className="text-sm text-[var(--muted)]">BTC, ETH, SOL, ADA, BNB, XRP</p>
                  </div>
                </div>
                <CryptoGrid limit={30} variant="grid" />
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                  <MarketMoodIndicator value={72} />
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                  <PriceComparison />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Glossary variant="compact" />
              <MarketNews maxItems={4} />
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-4 text-center text-sm text-[var(--muted)]">
                <p className="text-[var(--text)] font-semibold mb-1">Miejsce na Twoją reklamę</p>
                <p>Slot 300x250 / 336x280</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
