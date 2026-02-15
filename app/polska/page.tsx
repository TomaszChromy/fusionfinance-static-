"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import { InfoTooltip } from "@/components/Tooltip";
import LiveIndicator from "@/components/LiveIndicator";
import UnifiedCategoryLayout from "@/components/UnifiedCategoryLayout";

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
          <div className="phi-section shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between mb-[26px] pb-[16px] border-b border-[#c9a962]/20" style={{ marginBottom: "var(--space-21)", paddingBottom: "var(--space-13)" }}>
              <div className="flex items-center gap-3" style={{ gap: "var(--space-8)" }}>
                <div className="w-1 h-7 bg-gradient-to-b from-[#c9a962] to-[#9a7b3c] rounded-full" />
                <div>
                  <h2 className="text-lg font-serif font-medium text-[#f4f4f5]">Artykuły</h2>
                  <p className="text-xs text-[#71717a] mt-0.5">Layout inspirowany Interia.pl, Bankier.pl i Washington Post</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <LiveIndicator label="Na żywo" />
                <InfoTooltip content="80 artykułów, 12 na stronę" />
              </div>
            </div>

            <UnifiedCategoryLayout feedType="polska" totalArticles={80} articlesPerPage={12} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
