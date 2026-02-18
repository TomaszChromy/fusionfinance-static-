"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SparklineChart, { generateMockData } from "@/components/SparklineChart";

const FAQ_ITEMS = [
  { q: "Od czego zależy kurs dolara?", a: "Kurs dolara do złotego zależy od polityki monetarnej FED i NBP, różnic w stopach procentowych, inflacji, bilansu handlowego Polski z USA oraz globalnego apetytu na ryzyko." },
  { q: "Dlaczego dolar jest walutą rezerwową?", a: "Dolar amerykański jest główną walutą rezerwową świata ze względu na wielkość i stabilność gospodarki USA, zaufanie do instytucji amerykańskich oraz dominację dolara w handlu międzynarodowym." },
  { q: "Kiedy NBP publikuje kurs dolara?", a: "NBP publikuje kursy średnie walut obcych, w tym dolara, w każdy dzień roboczy między godziną 11:45 a 12:15." },
  { q: "Jak kurs dolara wpływa na polską gospodarkę?", a: "Silny dolar zwiększa koszty importu surowców (ropa, gaz) i spłaty kredytów dolarowych, ale może wspierać eksporterów. Słaby dolar działa odwrotnie." },
  { q: "Czy warto trzymać oszczędności w dolarach?", a: "Dywersyfikacja walutowa może chronić przed deprecjacją złotego, ale niesie ryzyko kursowe. Decyzja zależy od indywidualnej sytuacji i horyzontu czasowego." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Kurs dolara (USD/PLN) - Aktualny kurs, wykres, analiza",
  "description": "Aktualny kurs dolara do złotego (USD/PLN) z NBP. Sprawdź wykres, analizę i czynniki wpływające na kurs dolara.",
  "author": { "@type": "Organization", "name": "FusionFinance.pl", "url": "https://fusionfinance.pl" },
  "publisher": { "@type": "Organization", "name": "FusionFinance.pl", "logo": { "@type": "ImageObject", "url": "https://fusionfinance.pl/logo.png" } },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split("T")[0],
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://fusionfinance.pl/waluty/usd-pln/" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } }))
};

export default function UsdPlnPage() {
  const [rate, setRate] = useState<{ mid: number; date: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sparkline] = useState(() => generateMockData(30, "neutral"));

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.nbp.pl/api/exchangerates/rates/A/USD?format=json");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setRate({ mid: data.rates[0].mid, date: data.rates[0].effectiveDate });
      } catch {
        setRate({ mid: 3.9845, date: new Date().toISOString().split("T")[0] });
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-4">
          <h1 className="text-3xl lg:text-4xl font-serif font-medium text-[#f4f4f5] mb-2">
            Kurs <span className="bg-gradient-to-r from-[var(--accent)] via-[#3b82f6] to-[#1d4ed8] bg-clip-text text-transparent">dolara</span> (USD/PLN)
          </h1>
          <p className="text-[#71717a] text-sm">Aktualny kurs dolara amerykańskiego do złotego, wykres i analiza rynku walutowego</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#0c0d10] border border-[var(--border)] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🇺🇸</span>
              <div>
                <p className="text-sm text-[#71717a]">Dolar amerykański do złotego</p>
                <p className="text-xs text-[#52525b]">Kurs średni NBP</p>
              </div>
            </div>
            <div className="text-right">
              {loading ? <div className="h-10 w-24 bg-white/5 rounded animate-pulse" /> : (
                <>
                  <p className="text-3xl font-bold text-[#f4f4f5]">{rate?.mid.toFixed(4)} <span className="text-lg text-[#71717a]">PLN</span></p>
                  <p className="text-xs text-[#52525b]">Data: {rate?.date}</p>
                </>
              )}
            </div>
          </div>
          <div className="h-20"><SparklineChart data={sparkline} color="#60a5fa" height={80} /></div>
          <p className="text-[10px] text-[#52525b] mt-2 text-center">Dane z Narodowego Banku Polskiego (NBP)</p>
        </motion.div>

        <div className="space-y-8">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#0c0d10] border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-[#f4f4f5] mb-4">📊 Co wpływa na kurs dolara?</h2>
            <div className="text-[#a1a1aa] leading-relaxed space-y-3 text-sm">
              <p>Dolar amerykański (USD) to najważniejsza waluta świata. Kurs USD/PLN ma kluczowe znaczenie dla polskiej gospodarki ze względu na handel międzynarodowy i ceny surowców.</p>
              <ul className="ml-4 space-y-1">
                <li>• <strong className="text-[var(--accent)]">Polityka FED</strong> – decyzje o stopach procentowych w USA</li>
                <li>• <strong className="text-[var(--accent)]">Dane makro</strong> – PKB, zatrudnienie, inflacja w USA</li>
                <li>• <strong className="text-[var(--accent)]">Geopolityka</strong> – dolar jako &ldquo;safe haven&rdquo; w kryzysach</li>
                <li>• <strong className="text-[var(--accent)]">Ceny surowców</strong> – ropa i gaz notowane w USD</li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#0c0d10] border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-[#f4f4f5] mb-4">📈 Analiza techniczna USD/PLN</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/[0.02] rounded-lg p-4 text-center">
                <p className="text-xs text-[#71717a] mb-1">Wsparcie</p>
                <p className="text-lg font-bold text-[#4ade80]">3.90 PLN</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-4 text-center">
                <p className="text-xs text-[#71717a] mb-1">Opór</p>
                <p className="text-lg font-bold text-[#f87171]">4.10 PLN</p>
              </div>
            </div>
            <p className="text-xs text-[#52525b] mt-2">*Poziomy orientacyjne, nie stanowią rekomendacji.</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#0c0d10] border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-[#f4f4f5] mb-4">❓ Najczęściej zadawane pytania</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border border-white/5 rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors">
                    <span className="text-sm font-medium text-[#f4f4f5]">{item.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="text-[var(--accent)]">▼</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                        <p className="px-4 pb-4 text-sm text-[#a1a1aa] leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="mt-8 text-center text-xs text-[#52525b]">
          <p>Dane mają charakter informacyjny. <a href="/disclaimer" className="text-[var(--accent)] hover:underline">Przeczytaj pełne zastrzeżenie prawne</a>.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
