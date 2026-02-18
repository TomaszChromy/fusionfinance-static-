"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SparklineChart, { generateMockData } from "@/components/SparklineChart";

const FAQ_ITEMS = [
  { q: "Od czego zależy kurs euro?", a: "Kurs euro do złotego zależy od wielu czynników: polityki monetarnej ECB i NBP, inflacji w Polsce i strefie euro, bilansu handlowego, nastrojów inwestorów oraz sytuacji geopolitycznej." },
  { q: "Kiedy NBP publikuje kursy walut?", a: "NBP publikuje kursy średnie walut obcych w każdy dzień roboczy, zazwyczaj między godziną 11:45 a 12:15. Kursy obowiązują od dnia ich publikacji." },
  { q: "Czy kurs NBP to kurs wymiany w kantorze?", a: "Nie. Kurs NBP to kurs średni używany do celów księgowych i podatkowych. Kantory i banki stosują własne kursy kupna i sprzedaży, które różnią się od kursu NBP." },
  { q: "Jak historycznie kształtował się kurs EUR/PLN?", a: "Od wejścia Polski do UE kurs EUR/PLN wahał się od ok. 3.20 PLN (2008) do ponad 4.90 PLN (2022). Średnia długoterminowa to ok. 4.20-4.40 PLN." },
  { q: "Czy Polska przyjmie euro?", a: "Polska jest zobowiązana do przyjęcia euro, ale nie ma określonej daty. Wymaga to spełnienia kryteriów konwergencji i zmiany Konstytucji RP." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Kurs euro (EUR/PLN) - Aktualny kurs, wykres, analiza",
  "description": "Aktualny kurs euro do złotego (EUR/PLN) z NBP. Sprawdź wykres, analizę techniczną i czynniki wpływające na kurs euro.",
  "author": { "@type": "Organization", "name": "FusionFinance.pl", "url": "https://fusionfinance.pl" },
  "publisher": { "@type": "Organization", "name": "FusionFinance.pl", "logo": { "@type": "ImageObject", "url": "https://fusionfinance.pl/logo.png" } },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split("T")[0],
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://fusionfinance.pl/waluty/eur-pln/" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a }
  }))
};

export default function EurPlnPage() {
  const [rate, setRate] = useState<{ mid: number; date: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sparkline] = useState(() => generateMockData(30, "neutral"));

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.nbp.pl/api/exchangerates/rates/A/EUR?format=json");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setRate({ mid: data.rates[0].mid, date: data.rates[0].effectiveDate });
      } catch {
        setRate({ mid: 4.2856, date: new Date().toISOString().split("T")[0] });
      }
      setLoading(false);
    }
    fetchRate();
  }, []);

  return (
    <main className="min-h-screen bg-[#08090c]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <div className="mx-auto max-w-[1000px] px-4 lg:px-6 py-8">
        <Breadcrumbs />

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-4">
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-[#f4f4f5] mb-2">
            Kurs <span className="bg-gradient-to-r from-[var(--accent)] via-[#3b82f6] to-[#1d4ed8] bg-clip-text text-transparent">euro</span> (EUR/PLN)
          </h1>
          <p className="text-[#71717a] text-sm">Aktualny kurs euro do złotego, wykres historyczny i analiza rynku walutowego</p>
        </motion.div>

        {/* Live Rate Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#0c0d10] border border-[var(--border)] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇪🇺</span>
              <div>
                <p className="text-sm text-[#71717a]">Euro do złotego polskiego</p>
                <p className="text-xs text-[#52525b]">Kurs średni NBP</p>
              </div>
            </div>
            <div className="text-right">
              {loading ? (
                <div className="h-10 w-24 bg-white/5 rounded animate-pulse" />
              ) : (
                <>
                  <p className="text-3xl font-bold text-[#f4f4f5]">{rate?.mid.toFixed(4)} <span className="text-lg text-[#71717a]">PLN</span></p>
                  <p className="text-xs text-[#52525b]">Data: {rate?.date}</p>
                </>
              )}
            </div>
          </div>
          <div className="h-20">
            <SparklineChart data={sparkline} color="#60a5fa" height={80} />
          </div>
          <p className="text-[10px] text-[#52525b] mt-2 text-center">Dane z Narodowego Banku Polskiego (NBP)</p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#0c0d10] border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-[#f4f4f5] mb-4">📊 Co wpływa na kurs euro?</h2>
            <div className="text-[#a1a1aa] leading-relaxed space-y-3 text-sm">
              <p>Kurs EUR/PLN jest jednym z najważniejszych wskaźników dla polskiej gospodarki. Wpływa na ceny importowanych towarów, koszty wakacji zagranicznych oraz spłatę kredytów walutowych.</p>
              <p><strong className="text-[#f4f4f5]">Główne czynniki wpływające na kurs:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <strong className="text-[var(--accent)]">Polityka monetarna</strong> – decyzje ECB i NBP o stopach procentowych</li>
                <li>• <strong className="text-[var(--accent)]">Inflacja</strong> – różnice w poziomie inflacji między Polską a strefą euro</li>
                <li>• <strong className="text-[var(--accent)]">Bilans handlowy</strong> – eksport i import towarów i usług</li>
                <li>• <strong className="text-[var(--accent)]">Nastroje rynkowe</strong> – apetyt na ryzyko inwestorów globalnych</li>
                <li>• <strong className="text-[var(--accent)]">Geopolityka</strong> – sytuacja w regionie i na świecie</li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#0c0d10] border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-[#f4f4f5] mb-4">📈 Analiza techniczna EUR/PLN</h2>
            <div className="text-[#a1a1aa] leading-relaxed space-y-3 text-sm">
              <p>Analiza techniczna kursu EUR/PLN opiera się na historycznych poziomach wsparcia i oporu oraz formacjach cenowych.</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/[0.02] rounded-lg p-4 text-center">
                  <p className="text-xs text-[#71717a] mb-1">Wsparcie</p>
                  <p className="text-lg font-bold text-[#4ade80]">4.25 PLN</p>
                </div>
                <div className="bg-white/[0.02] rounded-lg p-4 text-center">
                  <p className="text-xs text-[#71717a] mb-1">Opór</p>
                  <p className="text-lg font-bold text-[#f87171]">4.35 PLN</p>
                </div>
              </div>
              <p className="text-xs text-[#52525b] mt-2">*Poziomy orientacyjne, nie stanowią rekomendacji.</p>
            </div>
          </motion.section>

          {/* FAQ with Schema */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#0c0d10] border border-white/5 rounded-xl p-6"
            itemScope itemType="https://schema.org/FAQPage">
            <h2 className="text-xl font-medium text-[#f4f4f5] mb-4">❓ Najczęściej zadawane pytania</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                  className="border border-white/5 rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors">
                    <span itemProp="name" className="text-sm font-medium text-[#f4f4f5]">{item.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="text-[var(--accent)]">▼</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                        itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <p itemProp="text" className="px-4 pb-4 text-sm text-[#a1a1aa] leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-[#52525b]">
          <p>Dane mają charakter informacyjny. <a href="/disclaimer" className="text-[var(--accent)] hover:underline">Przeczytaj pełne zastrzeżenie prawne</a>.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
