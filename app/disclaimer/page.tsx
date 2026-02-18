"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />

      <div className="mx-auto max-w-[900px] px-4 lg:px-6 py-12">
        <PageHero
          title="Zastrzeżenie prawne"
          subtitle="Ważne informacje dotyczące korzystania z serwisu FusionFinance."
          eyebrow="Informacje prawne"
          badge="Aktualizacja: 30 listopada 2025"
        />

        <div className="space-y-8">
          {/* Main disclaimer */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0c0d10] border border-[var(--border)] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-xl font-medium text-[var(--accent)]">Brak rekomendacji inwestycyjnych</h2>
            </div>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              <strong className="text-[#f4f4f5]">Wszystkie treści publikowane na stronie FusionFinance.pl mają wyłącznie charakter informacyjny i edukacyjny.</strong> Nie stanowią one:
            </p>
            <ul className="space-y-2 text-[#a1a1aa] ml-4">
              <li className="flex items-start gap-2"><span className="text-[#f87171]">✗</span> Rekomendacji inwestycyjnych w rozumieniu Rozporządzenia MAR</li>
              <li className="flex items-start gap-2"><span className="text-[#f87171]">✗</span> Porady finansowej, prawnej ani podatkowej</li>
              <li className="flex items-start gap-2"><span className="text-[#f87171]">✗</span> Oferty zakupu lub sprzedaży instrumentów finansowych</li>
              <li className="flex items-start gap-2"><span className="text-[#f87171]">✗</span> Zachęty do inwestowania w jakiekolwiek aktywa</li>
            </ul>
          </motion.section>

          {/* Risk warning */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0c0d10] border border-white/5 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📉</span>
              <h2 className="text-xl font-medium text-[#f4f4f5]">Ostrzeżenie o ryzyku</h2>
            </div>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Inwestowanie w instrumenty finansowe wiąże się z ryzykiem utraty części lub całości zainwestowanego kapitału. W szczególności:
            </p>
            <ul className="space-y-2 text-[#a1a1aa] ml-4">
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> <strong className="text-[#f4f4f5]">Kryptowaluty</strong> są wysoce zmienne i mogą stracić całą wartość</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> <strong className="text-[#f4f4f5]">Akcje i indeksy giełdowe</strong> mogą znacząco spadać w wartości</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> <strong className="text-[#f4f4f5]">Kursy walut</strong> podlegają wahaniom wpływającym na wartość inwestycji</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> <strong className="text-[#f4f4f5]">Wyniki historyczne</strong> nie gwarantują przyszłych zysków</li>
            </ul>
          </motion.section>

          {/* Data sources */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0c0d10] border border-white/5 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <h2 className="text-xl font-medium text-[#f4f4f5]">Źródła danych</h2>
            </div>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Dane prezentowane na stronie pochodzą z następujących źródeł:
            </p>
            <ul className="space-y-2 text-[#a1a1aa] ml-4">
              <li className="flex items-start gap-2"><span className="text-[#4ade80]">✓</span> <strong className="text-[#f4f4f5]">Kursy walut:</strong> Narodowy Bank Polski (NBP) – tabela A i B</li>
              <li className="flex items-start gap-2"><span className="text-[#4ade80]">✓</span> <strong className="text-[#f4f4f5]">Kryptowaluty:</strong> CoinGecko API</li>
              <li className="flex items-start gap-2"><span className="text-[#4ade80]">✓</span> <strong className="text-[#f4f4f5]">Newsy finansowe:</strong> Agregacja z polskich portali (Money.pl, Bankier.pl, ISBnews i inne)</li>
              <li className="flex items-start gap-2"><span className="text-[#4ade80]">✓</span> <strong className="text-[#f4f4f5]">Dane giełdowe:</strong> Publicznie dostępne informacje</li>
            </ul>
            <p className="text-[#71717a] text-sm mt-4">
              Dane mogą być opóźnione i nie powinny być traktowane jako podstawa decyzji inwestycyjnych w czasie rzeczywistym.
            </p>
          </motion.section>

          {/* Recommendation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0c0d10] border border-white/5 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💼</span>
              <h2 className="text-xl font-medium text-[#f4f4f5]">Zalecenia</h2>
            </div>
            <p className="text-[#a1a1aa] leading-relaxed">
              Przed podjęciem jakichkolwiek decyzji inwestycyjnych zalecamy:
            </p>
            <ul className="space-y-2 text-[#a1a1aa] ml-4 mt-4">
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">1.</span> Skonsultowanie się z <strong className="text-[#f4f4f5]">licencjonowanym doradcą inwestycyjnym</strong></li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">2.</span> Zapoznanie się z <strong className="text-[#f4f4f5]">dokumentacją produktową</strong> (KID, prospekt)</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">3.</span> Ocenę własnej <strong className="text-[#f4f4f5]">tolerancji na ryzyko</strong></li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">4.</span> Inwestowanie tylko środków, na których utratę możesz sobie pozwolić</li>
            </ul>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center py-8"
          >
            <p className="text-[#71717a] text-sm mb-4">
              W razie pytań dotyczących niniejszego zastrzeżenia, skontaktuj się z nami:
            </p>
            <Link
              href="mailto:tomasz.chromy@outlook.com"
              className="text-[var(--accent)] hover:text-[#93c5fd] transition-colors"
            >
              tomasz.chromy@outlook.com
            </Link>
          </motion.section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
