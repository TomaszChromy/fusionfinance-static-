"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import MarketNews from "@/components/MarketNews";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import MarketBar from "@/components/MarketBar";

export default function SwiatPage() {
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
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8">
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
