"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { CategoryBadge } from "@/components/Badge";
import HeatMap from "@/components/HeatMap";
import TrendIndicator from "@/components/TrendIndicator";
import StockTicker from "@/components/StockTicker";
import TradingViewChart from "@/components/TradingViewChart";
import TopList from "@/components/TopList";

export default function GieldaPage() {
  const headlineTickers = [
    { symbol: "WIG20", name: "Warszawa", price: 2543.2, change: 12.4, changePercent: 0.49 },
    { symbol: "mWIG40", name: "MidCap", price: 6123.5, change: -21.3, changePercent: -0.35 },
    { symbol: "sWIG80", name: "SmallCap", price: 22345.1, change: 54.2, changePercent: 0.24 },
    { symbol: "DAX", name: "Frankfurt", price: 18874.3, change: -32.1, changePercent: -0.17 },
    { symbol: "S&P 500", name: "USA", price: 5174.9, change: 15.8, changePercent: 0.31 },
    { symbol: "NASDAQ", name: "USA", price: 18943.4, change: 82.4, changePercent: 0.44 },
    { symbol: "CAC40", name: "Paryż", price: 7522.1, change: -12.4, changePercent: -0.16 },
    { symbol: "FTSE100", name: "Londyn", price: 7643.2, change: 9.8, changePercent: 0.13 },
    { symbol: "IBEX35", name: "Madryt", price: 10382.4, change: 14.7, changePercent: 0.14 },
    { symbol: "NIKKEI225", name: "Tokio", price: 35980.2, change: -120.5, changePercent: -0.33 },
    { symbol: "HSI", name: "Hongkong", price: 17654.8, change: 86.2, changePercent: 0.49 },
    { symbol: "CSI300", name: "Szanghaj/Shenzhen", price: 3305.5, change: 22.1, changePercent: 0.67 },
    { symbol: "BSE SENSEX", name: "Bombaj", price: 73450.1, change: -210.3, changePercent: -0.29 },
    { symbol: "NIFTY50", name: "Bombaj", price: 22164.4, change: -55.2, changePercent: -0.25 },
    { symbol: "ASX200", name: "Sydney", price: 7580.3, change: 18.5, changePercent: 0.24 },
    { symbol: "TSX", name: "Toronto", price: 21284.7, change: 32.1, changePercent: 0.15 },
    { symbol: "BOVESPA", name: "Sao Paulo", price: 127640.2, change: -420.4, changePercent: -0.33 },
    { symbol: "IPC", name: "Meksyk", price: 56780.5, change: 65.2, changePercent: 0.12 },
    { symbol: "SMI", name: "Zurych", price: 11452.8, change: -24.1, changePercent: -0.21 },
    { symbol: "OMX30", name: "Sztokholm", price: 2398.4, change: 9.7, changePercent: 0.41 },
    { symbol: "AEX", name: "Amsterdam", price: 876.5, change: 5.2, changePercent: 0.60 },
    { symbol: "MIB", name: "Mediolan", price: 31125.6, change: -74.3, changePercent: -0.24 },
    { symbol: "PSI20", name: "Lizbona", price: 6421.7, change: 8.6, changePercent: 0.13 },
    { symbol: "RTS", name: "Moskwa", price: 1150.4, change: -6.8, changePercent: -0.59 },
    { symbol: "KOSPI", name: "Seul", price: 2657.3, change: 21.5, changePercent: 0.82 },
    { symbol: "TA35", name: "Tel Awiw", price: 1872.9, change: 12.9, changePercent: 0.69 },
    { symbol: "BET", name: "Bukareszt", price: 14123.6, change: 44.1, changePercent: 0.31 },
    { symbol: "WIG-ENERG", name: "Energetyka", price: 3475.2, change: 22.3, changePercent: 0.65 },
    { symbol: "WIG-BANKI", name: "Banki", price: 10234.6, change: -31.5, changePercent: -0.31 },
    { symbol: "WIG-GAMES", name: "Gaming", price: 1950.3, change: 18.2, changePercent: 0.94 },
    { symbol: "WIG-BUDOW", name: "Budowlanka", price: 8421.1, change: -12.4, changePercent: -0.15 },
    { symbol: "WIG-MEDIA", name: "Media", price: 2150.9, change: 6.4, changePercent: 0.30 },
    { symbol: "ETF-SPY", name: "S&P 500 ETF", price: 515.6, change: 2.8, changePercent: 0.55 },
    { symbol: "ETF-QQQ", name: "Nasdaq 100 ETF", price: 430.2, change: 1.9, changePercent: 0.44 },
  ];

  const heatmapData = [
    { id: "pko", symbol: "PKO", name: "PKO BP", change: 1.8, value: 47.2, size: 54 },
    { id: "pzu", symbol: "PZU", name: "PZU", change: -0.9, value: 42.1, size: 50 },
    { id: "cdr", symbol: "CDR", name: "CD Projekt", change: 4.4, value: 148.3, size: 48 },
    { id: "peo", symbol: "PEO", name: "Pekao", change: 0.6, value: 126.5, size: 40 },
    { id: "dnp", symbol: "DNP", name: "Dino", change: 2.1, value: 388.2, size: 46 },
    { id: "kgh", symbol: "KGH", name: "KGHM", change: -2.7, value: 143.1, size: 44 },
    { id: "opl", symbol: "OPL", name: "Orange", change: 0.4, value: 8.25, size: 28 },
    { id: "lpp", symbol: "LPP", name: "LPP", change: 3.1, value: 12480, size: 52 },
    { id: "spl", symbol: "SPL", name: "Santander", change: -0.6, value: 381.5, size: 42 },
    { id: "ale", symbol: "ALE", name: "Allegro", change: 1.2, value: 34.6, size: 40 },
    { id: "cps", symbol: "CPS", name: "Cyfrowy PL", change: -3.1, value: 24.4, size: 34 },
    { id: "jsw", symbol: "JSW", name: "JSW", change: -4.1, value: 27.9, size: 30 },
    { id: "pgn", symbol: "PGN", name: "PGNiG", change: 0.9, value: 6.4, size: 26 },
    { id: "mbk", symbol: "MBK", name: "mBank", change: 2.6, value: 600.2, size: 46 },
    { id: "plt", symbol: "PLT", name: "Play", change: -1.4, value: 31.8, size: 32 },
    { id: "asz", symbol: "ASZ", name: "Asseco", change: 1.1, value: 88.5, size: 38 },
  ];

  const topMoversData = {
    gainers: [
      { symbol: "CDR", name: "CD Projekt", change: "+4.4%" },
      { symbol: "JSW", name: "JSW", change: "+3.1%" },
      { symbol: "LPP", name: "LPP", change: "+2.5%" },
    ],
    losers: [
      { symbol: "KGH", name: "KGHM", change: "-2.7%" },
      { symbol: "PZU", name: "PZU", change: "-1.1%" },
      { symbol: "CPS", name: "Cyfrowy Polsat", change: "-0.9%" },
    ],
    volume: [
      { symbol: "PKO", name: "PKO BP", volume: "82 mln" },
      { symbol: "PEO", name: "Pekao", volume: "66 mln" },
      { symbol: "ALE", name: "Allegro", volume: "54 mln" },
    ],
  };

  const calendarItems = [
    { date: "18 lut", time: "14:00", title: "Fed minutes", tag: "USA" },
    { date: "20 lut", time: "10:00", title: "RPP: komunikat", tag: "PL" },
    { date: "22 lut", time: "14:30", title: "CPI USA (m/m)", tag: "Makro" },
  ];

  return (
    <main className="min-h-screen bg-[#08090c]">
      <Navbar />

      <div className="phi-shell">
        <Breadcrumbs />
        <PageHero
          title="Giełda"
          subtitle="GPW i globalne parkiety: WIG20, mWIG40, sWIG80, dywidendy, IPO i debiuty."
          eyebrow="GPW & świat"
          badge="Live"
          accentFrom="#4ade80"
          accentTo="#22c55e"
          rightSlot={<CategoryBadge category="gielda" />}
        />

        <div className="space-y-8 lg:space-y-10">
          <div className="phi-section overflow-hidden">
            <div className="flex items-center border-b border-white/5" style={{ gap: "var(--space-8)", padding: "var(--space-13) var(--space-8)" }}>
              <div className="w-1 h-7 bg-gradient-to-b from-[#4ade80] to-[#22c55e] rounded-full" />
              <div>
                <h2 className="text-lg font-serif font-medium text-[#f4f4f5]">Notowania giełdowe</h2>
                <p className="text-xs text-[#71717a]">GPW + główne indeksy światowe</p>
              </div>
            </div>
            <StockTicker items={headlineTickers} speed={65} variant="detailed" className="bg-[#0c0d10]" />
            <div className="phi-grid grid-cols-1 lg:grid-cols-2" style={{ padding: "var(--space-13)" }}>
              <TradingViewChart symbol="GPW:WIG20" height={320} />
              <TradingViewChart symbol="SP:SPX" height={320} />
            </div>
          </div>

          <div className="phi-grid lg:grid-cols-2">
            <HeatMap title="Mapa ciepła WIG20" data={heatmapData} className="shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] phi-section" />

            <div className="phi-section hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-[#4ade80] to-[#22c55e] rounded-full" />
                <h3 className="text-xs font-semibold text-[#f4f4f5] uppercase tracking-[0.1em] flex items-center gap-2">
                  <span>📊</span> Trendy indeksów
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <TrendIndicator direction="up" strength="moderate" label="WIG20" value="+0.49%" />
                <TrendIndicator direction="down" strength="weak" label="mWIG40" value="-0.35%" />
                <TrendIndicator direction="up" strength="strong" label="S&P 500" value="+0.31%" />
                <TrendIndicator direction="down" strength="moderate" label="NASDAQ" value="-0.22%" />
                <TrendIndicator direction="up" strength="weak" label="DAX" value="+0.12%" />
                <TrendIndicator direction="down" strength="weak" label="CAC40" value="-0.18%" />
                <TrendIndicator direction="up" strength="moderate" label="NIKKEI" value="+0.66%" />
                <TrendIndicator direction="up" strength="strong" label="HSI" value="+1.08%" />
              </div>
            </div>
          </div>

          <div className="phi-grid lg:grid-cols-[2fr_1.2fr]" style={{ gap: "var(--space-21)" }}>
            <div className="phi-section">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[#4ade80] to-[#22c55e] rounded-full" />
                <h3 className="text-xs font-semibold text-[#f4f4f5] uppercase tracking-[0.1em]">Top listy dnia</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TopList title="Wzrosty" items={topMoversData.gainers.map(i => ({ label: i.symbol, value: i.change, hint: i.name, direction: "up" }))} />
                <TopList title="Spadki" items={topMoversData.losers.map(i => ({ label: i.symbol, value: i.change, hint: i.name, direction: "down" }))} />
                <TopList title="Wolumen" items={topMoversData.volume.map(i => ({ label: i.symbol, value: i.volume, hint: i.name }))} />
              </div>
            </div>

            <div className="phi-section">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[#4ade80] to-[#22c55e] rounded-full" />
                <h3 className="text-xs font-semibold text-[#f4f4f5] uppercase tracking-[0.1em]">Kalendarz rynkowy</h3>
              </div>
              <ul className="space-y-3">
                {calendarItems.map((item) => (
                  <li key={item.title} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-3 text-sm text-[#e4e4e7]">
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-[#c9a962] font-semibold w-16 flex flex-col leading-tight">
                        <span>{item.date}</span>
                        <span className="text-[11px] text-[#9ca3af]">{item.time}</span>
                      </div>
                      <div>
                        <p className="font-medium leading-snug">{item.title}</p>
                        <p className="text-[12px] text-[#9ca3af]">{item.tag}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#c9a962] font-semibold">Nadchodzi</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
