"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticlesPaginated from "@/components/ArticlesPaginated";

export default function BiznesPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />
      <div className="phi-shell">
        <Breadcrumbs />
        <PageHero
          title="Biznes"
          subtitle="Firmy, gospodarka, makro – w duchu bankier.pl i parkiet.com."
          eyebrow="Biznes"
          badge="Agregator PL"
        />
        <div className="phi-section">
          <ArticlesPaginated category="rynki" articlesPerPage={64} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
