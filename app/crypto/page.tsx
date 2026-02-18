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

export default function CryptoPage() {
  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Kryptowaluty"
          subtitle="BTC, ETH, DeFi, NFT – wiadomości, kursy i nastroje rynku w jednym miejscu."
          eyebrow="Crypto hub"
          badge="Live"
          accentFrom="#f7931a"
          accentTo="#f59e0b"
          rightSlot={<CategoryBadge category="crypto" />}
        />

        <div className="space-y-8 mt-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-7 bg-gradient-to-b from-[#f7931a] to-[#f59e0b] rounded-full" />
              <div>
                <h2 className="text-lg font-semibold text-[var(--text)]">Kursy kryptowalut</h2>
                <p className="text-sm text-[var(--muted)]">BTC, ETH, SOL, ADA, BNB, XRP</p>
              </div>
            </div>
            <CryptoGrid limit={30} variant="grid" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4 md:p-6">
              <ArticleFeedLoadMore
                feedType="crypto"
                initialCount={12}
                step={6}
                title="Artykuły crypto"
                subtitle="BTC, ETH, DeFi, NFT"
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                <MarketMoodIndicator value={72} />
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                <Glossary variant="compact" />
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                <PriceComparison />
              </div>
              <MarketNews maxItems={4} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
