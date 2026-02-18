"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 21 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="mt-12 lg:mt-16 pt-10 lg:pt-14 bg-[var(--surface)] border-t border-[var(--border)]"
    >
      {/* Logo */}
      <div className="text-center mb-6">
        <Link href="/" className="inline-block group">
          <span className="font-serif text-2xl lg:text-3xl font-medium text-[var(--text)]">
            Fusion<span className="bg-gradient-to-r from-[#e4d4a5] via-[#c9a962] to-[#9a7b3c] bg-clip-text text-transparent">Finance</span>
          </span>
          <div className="mt-2 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-[#c9a962]/50 to-transparent group-hover:via-[#c9a962] transition-all duration-500" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8 px-4">
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.15em] text-[#c9a962] font-medium mb-3">Serwis</h4>
          <Link href="/o-nas/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">O nas</Link>
          <Link href="/o-redakcji/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">O redakcji</Link>
          <Link href="/kontakt/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Kontakt</Link>
          <Link href="/disclaimer/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Disclaimer</Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.15em] text-[#c9a962] font-medium mb-3">Kategorie</h4>
          <Link href="/polska/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Polska</Link>
          <Link href="/swiat/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Świat</Link>
          <Link href="/gielda/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Giełda</Link>
          <Link href="/waluty/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Waluty</Link>
          <Link href="/crypto/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Krypto</Link>
          <Link href="/analizy/" className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors">Analizy</Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-[0.15em] text-[#c9a962] font-medium mb-3">Kontakt</h4>
          <a className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors" href="https://www.tomaszchromy.com" target="_blank" rel="noreferrer">www.tomaszchromy.com</a>
          <a className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="block text-xs text-[#9ca3af] hover:text-[var(--text)] transition-colors" href="https://twitter.com" target="_blank" rel="noreferrer">X (Twitter)</a>
        </div>
      </div>

      {/* Elegant divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#c9a962]/30" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#c9a962]/40" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#c9a962]/30" />
      </div>

      {/* Copyright */}
      <div className="text-center mb-4">
        <p className="text-[10px] text-[#9ca3af] tracking-[0.15em] uppercase">
          <Link
            href="https://tomaszchromy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c9a962] transition-colors duration-200"
          >
            © {new Date().getFullYear()} Tomasz Chromy
          </Link>
        </p>
      </div>

      {/* Disclaimers */}
      <div className="text-center mb-6 max-w-3xl mx-auto px-4">
        <p className="text-xs text-[#9ca3af] leading-relaxed">
          <span className="text-[#d1d5db] font-medium">Zastrzeżenie:</span> Informacje prezentowane na tej stronie mają charakter wyłącznie informacyjny i nie stanowią rekomendacji inwestycyjnych, porady finansowej ani oferty zakupu lub sprzedaży instrumentów finansowych. Decyzje inwestycyjne podejmuj samodzielnie, konsultując się z licencjonowanym doradcą.
        </p>
      </div>

      {/* Legal links */}
      <div className="flex items-center justify-center gap-4 text-[10px] pb-4">
        <Link
          href="/polityka-prywatnosci/"
          className="text-[#9ca3af] hover:text-[#c9a962] transition-colors duration-200 tracking-wide"
        >
          Polityka prywatności
        </Link>
        <span className="text-[#c9a962]/30">◆</span>
        <Link
          href="/regulamin/"
          className="text-[#9ca3af] hover:text-[#c9a962] transition-colors duration-200 tracking-wide"
        >
          Regulamin
        </Link>
        <span className="text-[#c9a962]/30">◆</span>
        <Link
          href="/cookies/"
          className="text-[#9ca3af] hover:text-[#c9a962] transition-colors duration-200 tracking-wide"
        >
          Cookies
        </Link>
      </div>

      {/* Partners Section */}
      <div className="pb-4" />

      {/* Bottom gold line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent" />
    </motion.footer>
  );
}
