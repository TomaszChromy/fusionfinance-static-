"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticlesPaginated from "@/components/ArticlesPaginated";

export default function PorownywarkiPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />
      <div className="phi-shell">
        <Breadcrumbs />
        <PageHero
          title="Porównywarki"
          subtitle="Konta, lokaty, kredyty, ubezpieczenia – inspiracja money.pl/bankier.pl."
          eyebrow="Narzędzia"
          badge="W przygotowaniu"
        />
        <div className="phi-section">
          <ArticlesPaginated category="finanse" articlesPerPage={64} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
