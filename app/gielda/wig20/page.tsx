"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SparklineChart, { generateMockData } from "@/components/SparklineChart";

const FAQ_ITEMS = [
  { q: "Co to jest WIG20?", a: "WIG20 to główny indeks Giełdy Papierów Wartościowych w Warszawie, obejmujący 20 największych i najbardziej płynnych spółek. Jest benchmarkiem polskiego rynku akcji." },
  { q: "Jakie spółki wchodzą w skład WIG20?", a: "W skład WIG20 wchodzą m.in.: PKO BP, PKN Orlen, PZU, KGHM, CD Projekt, Allegro, Pekao, mBank, Dino i inne największe spółki z GPW." },
  { q: "Kiedy notowany jest WIG20?", a: "WIG20 jest notowany w dni robocze od 9:00 do 17:00. Sesja składa się z fazy przed otwarciem, notowań ciągłych i fixingu na zamknięcie." },
  { q: "Jak inwestować w WIG20?", a: "W WIG20 można inwestować poprzez ETF-y (np. Beta ETF WIG20TR), kontrakty futures, opcje lub kupując akcje spółek wchodzących w jego skład." },
  { q: "Czym różni się WIG20 od WIG?", a: "WIG20 obejmuje 20 największych spółek, WIG to indeks szerokiego rynku obejmujący wszystkie spółki z głównego rynku GPW. WIG20 jest indeksem cenowym, WIG dochodowym." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "WIG20 - Indeks GPW, notowania, skład, analiza",
  "description": "WIG20 - główny indeks Giełdy Papierów Wartościowych w Warszawie. Aktualne notowania, skład indeksu, analiza i FAQ.",
  "author": { "@type": "Organization", "name": "FusionFinance.pl", "url": "https://fusionfinance.pl" },
  "publisher": { "@type": "Organization", "name": "FusionFinance.pl", "logo": { "@type": "ImageObject", "url": "https://fusionfinance.pl/logo.png" } },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split("T")[0],
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://fusionfinance.pl/gielda/wig20/" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } }))
};

const WIG20_COMPANIES = [
  { name: "PKO BP", sector: "Banki", weight: "15.2%" },
  { name: "PKN Orlen", sector: "Paliwa", weight: "12.8%" },
  { name: "PZU", sector: "Ubezpieczenia", weight: "8.5%" },
  { name: "KGHM", sector: "Surowce", weight: "7.2%" },
  { name: "CD Projekt", sector: "Gaming", weight: "6.1%" },
  { name: "Allegro", sector: "E-commerce", weight: "5.8%" },
];

export default function Wig20Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sparkline] = useState(() => generateMockData(30, "up"));

  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <div className="phi-shell">
        <Breadcrumbs />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-4">
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-[var(--text)] mb-2">
            <span className="bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1d4ed8] bg-clip-text text-transparent">WIG20</span> - Indeks GPW
          </h1>
          <p className="text-[var(--muted)] text-sm">Główny indeks Giełdy Papierów Wartościowych w Warszawie</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="phi-section" style={{ marginBottom: "var(--space-13)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📈</span>
              <div>
                <p className="text-sm text-[var(--muted)]">WIG20</p>
                <p className="text-xs text-[#9ca3af]">Główny indeks GPW</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[var(--text)]">2,456.78 <span className="text-lg text-[var(--muted)]">pkt</span></p>
              <p className="text-sm text-[#4ade80]">+1.25% (+30.45 pkt)</p>
            </div>
          </div>
          <div className="h-20"><SparklineChart data={sparkline} color="#60a5fa" height={80} /></div>
          <p className="text-[10px] text-[#9ca3af] mt-2 text-center">Dane demonstracyjne. Rzeczywiste notowania dostępne na GPW.</p>
        </motion.div>

        <div className="phi-stack" style={{ gap: "var(--space-21)" }}>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="phi-section">
            <h2 className="text-xl font-medium text-[var(--text)] mb-4">🏢 Największe spółki w WIG20</h2>
            <div className="phi-grid grid-cols-2 md:grid-cols-3" style={{ gap: "var(--space-8)" }}>
              {WIG20_COMPANIES.map((company) => (
                <div key={company.name} className="bg-white/[0.03] rounded-lg p-3 border border-[var(--border)]/60">
                  <p className="text-sm font-medium text-[var(--text)]">{company.name}</p>
                  <p className="text-xs text-[var(--muted)]">{company.sector}</p>
                  <p className="text-xs text-[var(--accent)]">{company.weight}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="phi-section">
            <h2 className="text-xl font-medium text-[var(--text)] mb-4">📊 Charakterystyka WIG20</h2>
            <div className="phi-grid grid-cols-2 md:grid-cols-4" style={{ gap: "var(--space-13)" }}>
              <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-[var(--border)]/60">
                <p className="text-xs text-[var(--muted)]">Typ indeksu</p>
                <p className="text-sm font-bold text-[var(--text)]">Cenowy</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-[var(--border)]/60">
                <p className="text-xs text-[var(--muted)]">Liczba spółek</p>
                <p className="text-sm font-bold text-[var(--text)]">20</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-[var(--border)]/60">
                <p className="text-xs text-[var(--muted)]">Bazowy</p>
                <p className="text-sm font-bold text-[var(--text)]">1000 pkt</p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3 text-center border border-[var(--border)]/60">
                <p className="text-xs text-[var(--muted)]">Od roku</p>
                <p className="text-sm font-bold text-[var(--text)]">1994</p>
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="phi-section">
            <h2 className="text-xl font-medium text-[var(--text)] mb-4">❓ Najczęściej zadawane pytania</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--surface)]">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors">
                    <span className="text-sm font-medium text-[var(--text)]">{item.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="text-[var(--accent)]">▼</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                        <p className="px-4 pb-4 text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="mt-8 text-center text-xs text-[var(--muted)]">
          <p>Dane mają charakter informacyjny. <a href="/disclaimer" className="text-[var(--accent)] hover:underline">Przeczytaj zastrzeżenie prawne</a>.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
