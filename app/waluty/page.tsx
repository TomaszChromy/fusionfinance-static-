"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import NBPCurrencyTable from "@/components/NBPCurrencyTable";
import CurrencyStrength from "@/components/CurrencyStrength";
import PriceComparison from "@/components/PriceComparison";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketNews from "@/components/MarketNews";
import MarketBar from "@/components/MarketBar";
import RSSFeatured from "@/components/RSSFeatured";
import RSSArticles from "@/components/RSSArticles";
import TopList from "@/components/TopList";

export default function WalutyPage() {
  const fxMajors = [
    { label: "EUR/PLN", value: "+0.29%" },
    { label: "USD/PLN", value: "-0.22%" },
    { label: "CHF/PLN", value: "+0.10%" },
    { label: "GBP/PLN", value: "+0.46%" },
    { label: "EUR/USD", value: "+0.08%" },
  ];
  const fxEmerging = [
    { label: "USD/CNH", value: "+0.12%" },
    { label: "USD/JPY", value: "-0.11%" },
    { label: "EUR/HUF", value: "+0.05%" },
  ];
  const cryptoTickers = [
    { label: "BTC", value: "+1.59%" },
    { label: "ETH", value: "+1.12%" },
    { label: "SOL", value: "+0.84%" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <MarketBar />
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Waluty"
          subtitle="FX, PLN, EUR/USD, GBP, CHF – kursy, makro, hedging i nastroje na rynku walutowym."
          eyebrow="Forex & PLN"
          badge="Live"
          rightSlot={<CategoryBadge category="waluty" />}
        />

        <div className="space-y-8 mt-6">
          {/* Hero + snapshot */}
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-white/5">
                <span className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[var(--danger)] text-black rounded">
                  Pilne
                </span>
                <span className="text-[11px] text-[var(--muted)]">FX</span>
              </div>
              <div className="p-4 md:p-6">
                <RSSFeatured
                  feedType="waluty"
                  limit={5}
                  title="Analiza dnia (FX)"
                  description="Najważniejszy materiał walutowy"
                  eyebrow=""
                />
              </div>
            </div>
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--text)]">Snapshot FX & Krypto</h3>
              <TopList title="Majors" items={fxMajors} />
              <TopList title="Crossy / EM" items={fxEmerging} />
              <TopList title="Krypto" items={cryptoTickers} />
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-4 text-center text-sm text-[var(--muted)]">
                <p className="text-[var(--text)] font-semibold mb-1">Miejsce na Twoją reklamę</p>
                <p>Slot 300x250 / 336x280</p>
              </div>
            </div>
          </div>

          {/* Kolumny newsów */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">FX / PLN</h2>
              <RSSArticles feedType="waluty" limit={5} showImage />
              <ArticleFeedLoadMore feedType="waluty" initialCount={6} step={3} />
            </div>
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">Makro / Hedging</h2>
              <RSSArticles feedType="biznes" limit={5} showImage />
              <ArticleFeedLoadMore feedType="biznes" initialCount={6} step={3} />
            </div>
            <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">Krypto</h2>
              <RSSArticles feedType="krypto" limit={5} showImage />
              <ArticleFeedLoadMore feedType="krypto" initialCount={6} step={3} />
            </div>
          </div>

          {/* Dane FX + narzędzia */}
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4 md:p-6">
                <NBPCurrencyTable />
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                  <CurrencyStrength />
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm p-4">
                  <PriceComparison />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <MarketNews maxItems={5} />
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[#0c0d10] p-4 text-center text-sm text-[var(--muted)]">
                <p className="text-[var(--text)] font-semibold mb-1">Miejsce na Twoją reklamę</p>
                <p>Kontakt: tomasz.chromy@outlook.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
