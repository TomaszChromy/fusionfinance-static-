"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { socialCircleClass, socialGlowClass, socialLabelClass } from "./socialStyles";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  variant?: "horizontal" | "vertical";
}

export default function ShareButtons({ 
  url, 
  title, 
  description = "",
  variant = "horizontal" 
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(description ? `${description} – ${title}` : title);

  const shareLinks = [
    {
      name: "X",
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: "LinkedIn",
      label: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      label: "f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      label: "WA",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const containerClass = variant === "vertical" 
    ? "flex flex-col gap-2" 
    : "flex items-center gap-2 flex-wrap";

  return (
    <div className={containerClass}>
      <span className="text-xs text-[#71717a] mr-2">Udostępnij:</span>
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={socialCircleClass}
          title={`Udostępnij na ${link.name}`}
        >
          <span className={socialLabelClass}>{link.label}</span>
          <span className={socialGlowClass} />
        </motion.a>
      ))}
      <motion.button
        type="button"
        onClick={copyToClipboard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-9 h-9 rounded-full border border-[#c9a962]/30 bg-gradient-to-br from-white/5 via-white/0 to-white/5 text-[#e4e4e7] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#c9a962]/60 hover:shadow-[0_12px_40px_rgba(201,169,98,0.25)]"
        title="Kopiuj link"
      >
        {copied ? (
          <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c9a962]/15 to-transparent opacity-0 blur-sm transition-opacity duration-200 hover:opacity-100" />
      </motion.button>
    </div>
  );
}
