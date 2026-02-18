"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

const AUTHORS: Record<string, { name: string; role: string; bio: string; avatar: string; website?: string; expertise: string[] }> = {
  "tomasz-chromy": {
    name: "Tomasz Chromy",
    role: "Założyciel & Główny Redaktor",
    bio: "Twórca FusionFinance.pl. Pasjonat technologii i finansów z wieloletnim doświadczeniem w branży IT. Zajmuje się rozwojem platformy, agregacją treści finansowych oraz analizą trendów rynkowych. Wierzy, że dostęp do rzetelnych informacji finansowych powinien być prosty i bezpłatny dla każdego.",
    avatar: "TC",
    website: "https://tomaszchromy.com",
    expertise: ["Technologia", "Finanse", "Kryptowaluty", "Rynki kapitałowe"],
  },
};

export default function AuthorPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const author = AUTHORS[slug];

  if (!author) {
    return (
      <main className="min-h-screen bg-[#08090c]">
        <Navbar />
        <div className="mx-auto max-w-[900px] px-4 py-20 text-center">
          <h1 className="text-2xl text-[#f4f4f5] mb-4">Autor nie znaleziony</h1>
          <Link href="/" className="text-[var(--accent)] hover:underline">Wróć na stronę główną</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090c]" itemScope itemType="https://schema.org/Person">
      <Navbar />
      <div className="mx-auto max-w-[900px] px-4 lg:px-6 py-8">
        <Breadcrumbs />

        {/* Author Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#0c0d10] border border-[var(--border)] rounded-2xl p-8 mt-4 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
              {author.avatar}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 itemProp="name" className="text-2xl lg:text-3xl font-serif font-medium text-[#f4f4f5] mb-1">{author.name}</h1>
              <p itemProp="jobTitle" className="text-[var(--accent)] text-sm mb-4">{author.role}</p>
              <p itemProp="description" className="text-[#a1a1aa] text-sm leading-relaxed mb-4">{author.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {author.expertise.map((exp) => (
                  <span key={exp} className="px-3 py-1 bg-white/5 text-[#71717a] text-xs rounded-full">{exp}</span>
                ))}
              </div>
              {author.website && (
                <Link href={author.website} target="_blank" rel="noopener noreferrer" itemProp="url"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--accent)] hover:text-[#93c5fd] transition-colors">
                  🌐 {author.website.replace("https://", "")}
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* Author Articles */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xl font-medium text-[#f4f4f5] mb-4 flex items-center gap-2">
            <span>📝</span> Artykuły autora
          </h2>
          <div className="bg-[#0c0d10] border border-white/5 rounded-xl p-6 text-center">
            <p className="text-[#71717a] text-sm">
              FusionFinance.pl agreguje treści z zewnętrznych źródeł. 
              <br />Artykuły autorskie pojawią się wkrótce.
            </p>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-8 text-center">
          <p className="text-[#71717a] text-sm mb-2">Kontakt z autorem:</p>
          <Link href="mailto:tomasz.chromy@outlook.com" className="text-[var(--accent)] hover:text-[#93c5fd] transition-colors text-sm">
            tomasz.chromy@outlook.com
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
