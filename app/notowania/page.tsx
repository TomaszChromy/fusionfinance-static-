"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import UnifiedCategoryLayout from "@/components/UnifiedCategoryLayout";
import LiveIndicator from "@/components/LiveIndicator";
import { InfoTooltip } from "@/components/Tooltip";
import MarketBar from "@/components/MarketBar";

export default function NotowaniaPage() {
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
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8">
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 bg-gradient-to-b from-[#60a5fa] to-[#2563eb] rounded-full" />
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
            <UnifiedCategoryLayout feedType="gielda" totalArticles={80} articlesPerPage={12} />
          </div>

          <div className="space-y-4">
            <LiveIndicator label="Rynek" />
            <InfoTooltip content="Agregator notowań w przygotowaniu" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
