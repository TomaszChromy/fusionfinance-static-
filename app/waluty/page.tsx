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

export default function WalutyPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <Breadcrumbs />
        <PageHero
          title="Waluty"
          subtitle="FX, PLN, EUR/USD, GBP, CHF – kursy, makro, hedging i nastroje na rynku walutowym."
          eyebrow="Forex & PLN"
          badge="Live"
          accentFrom="#60a5fa"
          accentTo="#3b82f6"
          rightSlot={<CategoryBadge category="waluty" />}
        />

        <div className="space-y-8 mt-6">
          <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4 md:p-6">
            <NBPCurrencyTable />
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4">
                  <CurrencyStrength />
                </div>
                <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4">
                  <PriceComparison />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#e6e8ee] shadow-sm p-4 md:p-6">
                <ArticleFeedLoadMore
                  feedType="waluty"
                  initialCount={12}
                  step={6}
                  title="Artykuły FX"
                  subtitle="Kursy, makro, hedging"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-[#e6e8ee] bg-gradient-to-r from-[#e0f2fe] via-white to-[#e0f2fe] p-5 lg:p-6 shadow-sm">
                <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#2563eb]">FX alert</p>
                    <h3 className="text-lg font-semibold text-[#0f172a]">Ustaw progi na EUR/PLN, USD/PLN i inne pary</h3>
                    <p className="text-sm text-[#334155] max-w-2xl">
                      Monitoruj ruchy PLN, dodaj pary walutowe do alertów i watchlisty. Powiadomienia lecą z naszego API bez konieczności logowania.
                    </p>
                  </div>
                  <a
                    href="/alerty/"
                    className="px-4 py-2 rounded-lg bg-[#2563eb] text-white text-sm font-semibold hover:brightness-110 transition"
                  >
                    Konfiguruj alert
                  </a>
                </div>
              </div>
              <MarketNews maxItems={5} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
