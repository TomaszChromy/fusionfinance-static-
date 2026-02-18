"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import ArticleList from "@/components/articles/ArticleList";

export default function PolskaPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />

      <div className="phi-shell">
        <Breadcrumbs />
        <PageHero
          title="Polska"
          subtitle="Wiadomości gospodarcze z Polski: GPW, makro NBP, budżet, inflacja, stopy procentowe."
          eyebrow="Ekonomia i rynki PL"
          badge="Live"
          rightSlot={<CategoryBadge category="rynki" />}
        />

        <div className="phi-stack" style={{ marginTop: "var(--space-13)", gap: "var(--space-21)" }}>
          <ArticleList
            feedType="polska"
            title="Najnowsze artykuły"
            subtitle="Świeże wiadomości gospodarcze z Polski"
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
