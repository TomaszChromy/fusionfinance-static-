"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#08090c] text-[#f4f4f5] flex flex-col">
      <header className="border-b border-white/5 px-6 py-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1d4ed8] animate-pulse" />
        <div>
          <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
          <div className="h-3 w-24 bg-white/5 rounded mt-2 animate-pulse" />
        </div>
      </header>

      <div className="phi-shell" style={{ width: "100%" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]" style={{ gap: "var(--space-21)" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="h-10 w-48 bg-white/10 rounded animate-pulse" />
            <div className="bg-[#0c0d10] border border-white/5 rounded-2xl p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
                  <div className="h-3 bg-white/5 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="h-10 w-40 bg-white/10 rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#0c0d10] border border-white/5 rounded-xl p-5 space-y-3">
                <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
              </div>
            ))}
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
