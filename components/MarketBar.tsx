"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const indices = [
  { label: "WIG20", value: 2543.2, change: 0.48 },
  { label: "S&P 500", value: 5174.9, change: 0.31 },
  { label: "Nasdaq", value: 18943.4, change: 0.44 },
  { label: "DAX", value: 18874.3, change: -0.17 },
];

const fx = [
  { label: "EUR/PLN", value: 4.3245, change: 0.29 },
  { label: "USD/PLN", value: 4.0156, change: -0.22 },
  { label: "GBP/PLN", value: 5.1234, change: 0.46 },
];

function Chip({ label, value, change }: { label: string; value: number; change: number }) {
  const isUp = change >= 0;
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[12px]">
      <span className="font-semibold text-[var(--text)]">{label}</span>
      <span className="font-mono text-[var(--text-2)]">{value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span className={`flex items-center gap-0.5 text-[11px] ${isUp ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change.toFixed(2)}%
      </span>
    </div>
  );
}

export default function MarketBar() {
  return (
    <div className="w-full border-b border-white/5 bg-[#0c0d10]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 flex flex-wrap items-center gap-2 py-2 text-sm overflow-x-auto">
        {indices.map((item) => (
          <Chip key={item.label} {...item} />
        ))}
        <div className="w-px h-5 bg-white/10" />
        {fx.map((item) => (
          <Chip key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
