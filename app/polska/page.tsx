"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import MarketNews from "@/components/MarketNews";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketBar from "@/components/MarketBar";

export default function PolskaPage() {
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

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8">
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
