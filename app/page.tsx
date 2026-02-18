"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/layout";
import { BreakingNews } from "@/components/navigation";
import RSSFeatured from "@/components/RSSFeatured";
import RSSArticles from "@/components/RSSArticles";
import ArticleList from "@/components/articles/ArticleList";
import { SocialProof, QuickActions } from "@/components/sidebar";
import MarketBar from "@/components/MarketBar";
import ArticleFeedLoadMore from "@/components/articles/ArticleFeedLoadMore";
import TopList from "@/components/TopList";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090c] text-[var(--text)]">
      <Navbar />
      <MarketBar />
      <BreakingNews />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <h1 className="sr-only">FusionFinance - Portal finansowy</h1>

        {/* Hero: main story + market snapshot */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 lg:grid-cols-[2fr_1fr] mt-8"
        >
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-white/5">
              <span className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[var(--danger)] text-black rounded">
                Pilne
              </span>
              <span className="text-[11px] text-[var(--muted)]">Aktualizowane na bieżąco</span>
            </div>
            <div className="p-4 md:p-6">
              <RSSFeatured
                feedType="all"
                limit={5}
                title="Analiza dnia"
                description="Najważniejszy materiał redakcyjny + kluczowe dane rynkowe"
                eyebrow=""
              />
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[var(--muted)]">WIG20</p>
                <p className="text-2xl font-semibold text-[var(--text)]">2 543,2 <span className="text-sm text-[var(--muted)]">pkt</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[var(--success)] font-semibold">+0.48%</p>
                <p className="text-[11px] text-[var(--muted)]">Dzienne zmiany</p>
              </div>
            </div>
            <TopList
              title="Top rynki"
              items={[
                { label: "S&P 500", value: "+0.31%", direction: "up" },
                { label: "Nasdaq", value: "+0.44%", direction: "up" },
                { label: "Dow Jones", value: "+0.18%", direction: "up" },
                { label: "DAX", value: "-0.17%", direction: "down" },
                { label: "Nikkei", value: "+0.66%", direction: "up" },
              ]}
            />
            <TopList
              title="Waluty / Surowce"
              items={[
                { label: "EUR/PLN", value: "+0.29%", direction: "up" },
                { label: "USD/PLN", value: "-0.22%", direction: "down" },
                { label: "Złoto", value: "-0.12%", direction: "down" },
                { label: "Ropa Brent", value: "+0.25%", direction: "up" },
                { label: "BTC", value: "+1.59%", direction: "up" },
              ]}
            />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a className="px-3 py-2 rounded-lg border border-[var(--border)] bg-white/5 text-center hover:border-[var(--accent)] transition-colors" href="/notowania">
                Przejdź do notowań
              </a>
              <a className="px-3 py-2 rounded-lg border border-[var(--border)] bg-white/5 text-center hover:border-[var(--accent)] transition-colors" href="/gielda">
                Otwórz screener
              </a>
            </div>
          </div>
        </motion.section>

        {/* Kolumny newsów */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-3 mt-10"
        >
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Gospodarka & Makro</h2>
            <RSSArticles feedType="swiat" limit={5} showImage />
            <ArticleFeedLoadMore feedType="swiat" initialCount={6} step={3} />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Giełda & Spółki</h2>
            <RSSArticles feedType="gielda" limit={5} showImage />
            <ArticleFeedLoadMore feedType="gielda" initialCount={6} step={3} />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Twoje finanse</h2>
            <RSSArticles feedType="biznes" limit={5} showImage />
            <ArticleFeedLoadMore feedType="biznes" initialCount={6} step={3} />
          </div>
        </motion.section>

        {/* Analizy i komentarze */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 lg:grid-cols-[1.4fr_1fr] mt-10"
        >
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[#0f1014] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Analizy ekspertów</h2>
            <RSSArticles feedType="analizy" limit={6} showImage />
          </div>
          <div className="rounded-2xl shadow-sm border border-[var(--border)] bg-[#0f1014] p-4 md:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Komentarze dzienne</h2>
            <ArticleList feedType="analizy" title="" subtitle="" limit={5} />
          </div>
        </motion.section>

        {/* Dane rynkowe – prosty dashboard placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 mt-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Dane rynkowe</h2>
            <p className="text-xs text-[var(--muted)]">Indeksy | Akcje | Waluty | Surowce | Krypto</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <TopList title="Indeksy" items={[{ label: "WIG20", value: "+0.48%", direction: "up" }, { label: "S&P 500", value: "+0.31%", direction: "up" }, { label: "DAX", value: "-0.17%", direction: "down" }]} />
            <TopList title="Waluty" items={[{ label: "EUR/PLN", value: "+0.29%", direction: "up" }, { label: "USD/PLN", value: "-0.22%", direction: "down" }, { label: "CHF/PLN", value: "+0.10%", direction: "up" }]} />
            <TopList title="Surowce/Krypto" items={[{ label: "Złoto", value: "-0.12%", direction: "down" }, { label: "Ropa Brent", value: "+0.25%", direction: "up" }, { label: "BTC", value: "+1.59%", direction: "up" }]} />
          </div>
        </motion.section>

        {/* Edukacja */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl shadow-sm border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 mt-10"
        >
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Edukacja i poradniki</h2>
          <ArticleFeedLoadMore feedType="biznes" initialCount={6} step={3} title="" subtitle="" />
        </motion.section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-12 mb-14 rounded-2xl border border-[var(--border)] bg-[#0f1014] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]">Newsletter</p>
            <h2 className="text-xl font-semibold text-[var(--text)]">Codzienny przegląd rynków</h2>
            <p className="text-sm text-[var(--muted)]">Godz. 7:30, indeksy, FX, krypto, najważniejsze newsy dnia.</p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input type="email" required placeholder="Twój e-mail" className="px-3 py-3 rounded-lg bg-[#0c0d10] border border-[var(--border)] text-sm w-full md:min-w-[240px]" />
            <button type="submit" className="px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--gold-dark)] text-[#08090c] font-semibold hover:opacity-90 transition-colors">
              Zapisz się
            </button>
          </form>
        </motion.section>

        <motion.section
          aria-labelledby="stats-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-12 mb-14"
        >
          <h2 id="stats-heading" className="sr-only">Statystyki portalu</h2>
          <SocialProof variant="compact" />
        </motion.section>
      </div>

      <Footer />
      <QuickActions />
    </main>
  );
}
