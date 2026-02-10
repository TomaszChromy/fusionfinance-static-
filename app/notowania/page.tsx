"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticlesPaginated from "@/components/ArticlesPaginated";

export default function NotowaniaPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />
      <div className="phi-shell">
        <Breadcrumbs />
        <PageHero
          title="Notowania"
          subtitle="GPW, globalne indeksy, FX, krypto – hub notowań jak w money.pl/bankier.pl."
          eyebrow="Rynki"
          badge="Agregator PL"
        />
        <div className="phi-section">
          <ArticlesPaginated category="gielda" articlesPerPage={64} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
