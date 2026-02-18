"use client";

import { motion } from "framer-motion";

interface TopListItem {
  label: string;
  value: string;
  hint?: string;
  direction?: "up" | "down";
}

interface TopListProps {
  title: string;
  items: TopListItem[];
}

export default function TopList({ title, items }: TopListProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0c0d10] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f4f4f5]">{title}</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <motion.li
            key={item.label + idx}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between text-[12px] text-[#e4e4e7]"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="text-[11px] text-[#9ca3af]">{idx + 1}.</span>
              <span className="font-semibold text-[#f4f4f5] truncate">{item.label}</span>
              {item.hint && <span className="text-[11px] text-[#9ca3af] truncate">{item.hint}</span>}
            </div>
            <span
              className={`text-[12px] font-semibold ${
                item.direction === "up"
                  ? "text-emerald-400"
                  : item.direction === "down"
                  ? "text-rose-400"
                  : "text-[#c9a962]"
              }`}
            >
              {item.value}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
