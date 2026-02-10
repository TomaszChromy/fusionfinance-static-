"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialCircleClass, socialGlowClass, socialLabelClass } from "./socialStyles";

interface QuickShareFABProps {
  url?: string;
  title?: string;
  className?: string;
}

const shareOptions = [
  {
    name: "X",
    label: "X",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    label: "in",
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    label: "f",
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    label: "WA",
    getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
];

export default function QuickShareFAB({ url, title = "", className = "" }: QuickShareFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = (option: typeof shareOptions[0]) => {
    window.open(option.getUrl(shareUrl, title), "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url: shareUrl, title });
        setIsOpen(false);
      } catch {}
    }
  };

  return (
    <div className={`fixed bottom-20 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col gap-2"
          >
            {shareOptions.map((option, index) => (
              <motion.button
                key={option.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => handleShare(option)}
                className={`${socialCircleClass} w-12 h-12`}
                title={option.name}
              >
                <span className={socialLabelClass}>{option.label}</span>
                <span className={socialGlowClass} />
              </motion.button>
            ))}
            
            {typeof navigator !== "undefined" && "share" in navigator && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleNativeShare}
                className="w-12 h-12 rounded-full bg-[#c9a962]/20 border border-[#c9a962]/30 flex items-center justify-center text-[#c9a962] hover:bg-[#c9a962] hover:text-[#08090c] transition-all"
                title="Więcej opcji"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isOpen 
            ? "bg-[#c9a962] text-[#08090c]" 
            : "bg-[#c9a962]/20 border border-[#c9a962]/30 text-[#c9a962] hover:bg-[#c9a962] hover:text-[#08090c]"
        }`}
      >
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          )}
        </motion.svg>
      </motion.button>
    </div>
  );
}
