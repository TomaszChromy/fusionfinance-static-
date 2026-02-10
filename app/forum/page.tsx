"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticlesPaginated from "@/components/ArticlesPaginated";

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />
      <div className="phi-shell">
        <Breadcrumbs />
        <PageHero
          title="Forum"
          subtitle="Dyskusje inwestorów, komentarze, przegląd tematów z rynku – feed artykułów jako inspiracja."
          eyebrow="Społeczność"
          badge="Read-only"
        />
        <div className="phi-section">
          <ArticlesPaginated category="gielda" articlesPerPage={64} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
