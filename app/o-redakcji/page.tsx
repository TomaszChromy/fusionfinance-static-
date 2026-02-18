"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const REDAKCJA = [
  {
    name: "Tomasz Chromy",
    role: "Założyciel & Główny Redaktor",
    bio: "Twórca FusionFinance.pl. Odpowiada za strategię produktu, kurację źródeł, rozwój technologii i standardy jakości danych.",
    avatar: "TC",
    links: { website: "https://tomaszchromy.com" },
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FusionFinance.pl",
  "url": "https://fusionfinance.pl",
  "logo": "https://fusionfinance.pl/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Tomasz Chromy",
    "url": "https://tomaszchromy.com"
  },
  "foundingDate": "2024",
  "description": "Agregator wiadomości finansowych z wiodących polskich portali",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "tomasz.chromy@outlook.com",
    "contactType": "customer service"
  }
};

export default function ORedakcjiPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />

      <div className="mx-auto max-w-[900px] px-4 lg:px-6 py-12">
        <PageHero
          title="O redakcji"
          subtitle="Kim jesteśmy, jak weryfikujemy źródła i jak dbamy o rzetelność agregacji finansowej."
          eyebrow="Informacje"
          badge="Polski agregator"
        />

        {/* Editorial Policy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0c0d10] border border-white/5 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-medium text-[var(--accent)]">Polityka redakcyjna</h2>
          </div>
          <div className="space-y-4 text-[#a1a1aa] leading-relaxed">
            <p>
              <strong className="text-[#f4f4f5]">FusionFinance.pl</strong> to agregator wiadomości finansowych, który zbiera i prezentuje treści z wiodących polskich portali finansowych. Naszym celem jest dostarczenie użytkownikom jednego miejsca do śledzenia najważniejszych informacji z rynków.
            </p>
            <p>
              <strong className="text-[#f4f4f5]">Zasady:</strong>
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> Kurujemy wyłącznie wiarygodne źródła (Money.pl, Bankier.pl, ISBnews, PAP), każdemu feedowi przypisujemy etykietę źródła.</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> Dane rynkowe pobieramy z oficjalnych API (NBP, CoinGecko); błędy lub braki sygnalizujemy na widoku.</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> Nie publikujemy rekomendacji inwestycyjnych; agregacja ma charakter informacyjny.</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> Każdy materiał zawiera atrybucję do źródła i link do oryginału.</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> AI wspiera automatyzację (deduplikacja, streszczenia), ale decyzje redakcyjne są ludzkie.</li>
              <li className="flex items-start gap-2"><span className="text-[var(--accent)]">•</span> Roadmapa i kod są transparentne; cele PWA wyznaczone na koniec 2026.</li>
            </ul>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-medium text-[#f4f4f5] mb-6 flex items-center gap-2">
            <span>👥</span> Zespół
          </h2>
          <div className="grid gap-4">
            {REDAKCJA.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#f4f4f5]">{person.name}</h3>
                  <p className="text-sm text-[var(--accent)] mb-2">{person.role}</p>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">{person.bio}</p>
                  {person.links.website && (
                    <Link
                      href={person.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#71717a] hover:text-[var(--accent)] mt-2 transition-colors"
                    >
                      🌐 {person.links.website.replace("https://", "")}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0c0d10] border border-white/5 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📰</span>
            <h2 className="text-xl font-medium text-[#f4f4f5]">Źródła informacji</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Money.pl", type: "Portal finansowy" },
              { name: "Bankier.pl", type: "Portal finansowy" },
              { name: "ISBnews", type: "Agencja prasowa" },
              { name: "PAP Biznes", type: "Agencja prasowa" },
              { name: "NBP", type: "Kursy walut" },
              { name: "CoinGecko", type: "Kryptowaluty" },
              { name: "GPW", type: "Indeksy i notowania" },
            ].map((source) => (
              <div key={source.name} className="text-center p-3 bg-white/[0.02] rounded-lg">
                <p className="text-sm font-medium text-[#f4f4f5]">{source.name}</p>
                <p className="text-[10px] text-[#71717a]">{source.type}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
        >
          <p className="text-[#71717a] text-sm mb-3">
            Masz pytania do redakcji, zgłoszenia źródeł lub błąd w danych?
          </p>
          <div className="flex flex-col items-center gap-2 text-sm">
            <Link
              href="mailto:tomasz.chromy@outlook.com"
              className="text-[var(--accent)] hover:text-[#93c5fd] transition-colors"
            >
              tomasz.chromy@outlook.com
            </Link>
            <span className="text-[#52525b] text-xs">Odpowiadamy w 24–48h (dni robocze)</span>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
}
