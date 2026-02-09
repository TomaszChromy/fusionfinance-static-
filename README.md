# FusionFinance.pl

Profesjonalny agregator wiadomości i danych rynkowych w eleganckim, ciemnym interfejsie. Next.js 16 + React 19 + TypeScript + Tailwind. Docelowo (koniec 2026) pełna PWA z offline, push i synchronizacją w tle.

## Autor
- **Tomasz Chromy** – założyciel i jedyny twórca  
  🌐 [tomaszchromy.com](https://tomaszchromy.com) · 📧 tomasz.chromy@outlook.com

## Kluczowe cechy
- **Agregacja treści**: kuracja wiodących portali finansowych (Money, Bankier, ISBnews, PAP) z jasną atrybucją źródła.
- **Dane rynkowe**: kursy NBP, indeksy GPW, kryptowaluty (BTC/ETH/alt), makro wskaźniki i wyceny w PLN/USD.
- **UX premium**: ciemny motyw ze złotymi akcentami, typografia Playfair + Geist, layout w proporcjach Golden Ratio.
- **Użytkownicy**: NextAuth v5 (credentials + Google), ulubione, historia, ustawienia, alerty, watchlist.
- **Statyczny eksport**: tryb `STATIC_EXPORT=true` dla hostingu współdzielonego (nazwa.pl) z PHP fallback (API w `public/api`).
- **PWA planowana na koniec 2026**: pełny offline, push, sync w tle, tryb oszczędzania danych (kamień milowy w roadmapie).

## Stos technologiczny
- **Frontend**: Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Next.js API Routes + Prisma ORM (PostgreSQL), fallback PHP dla środowisk bez Node.
- **Jakość/SEO**: Schema.org, Open Graph, sitemap/robots, sanity checks dla API, rate limiting w middleware.

## Wymagania
- Node.js 18.17+ (zalecane 20+)
- npm 9+ / 10+
- PostgreSQL (dla funkcji bazodanowych); tryb statyczny działa bez DB

## Szybki start (dev)
```bash
git clone https://github.com/TomaszChromy/fusionfinance.pl.git
cd fusionfinance.pl
npm install
cp .env.example .env.local   # uzupełnij klucze: AUTH_SECRET/NEXTAUTH_URL/DATABASE_URL itp.
npm run dev
```
Aplikacja: http://localhost:3000

## Build i deployment
- **Produkcja (SSR)**: `npm run build && npm run start`
- **Statyczny eksport (nazwa.pl)**: `npm run build:static`  
  - przed buildem skrypt przenosi `/app/api` do `.api-backup`, a po eksporcie przywraca API i kopiuje `.htaccess`/`robots.txt` do `out/`.
  - artefakty do wgrania: folder `out/`

## Migracje i Prisma (opcjonalnie)
```bash
npx prisma migrate dev --name init
npx prisma generate
```
Wymaga ustawionego `DATABASE_URL`.

## Skrypty npm
- `npm run dev` – środowisko deweloperskie
- `npm run build` – build produkcyjny (SSR)
- `npm run build:static` – statyczny eksport z PWA fallbackiem
- `npm run start` – start produkcyjny
- `npm run lint` – lintowanie
- `npm run typecheck` – kontrola typów

### Deployment
- **Vercel (SSR)**: patrz `VERCEL.md` – build `prisma generate && next build`, `STATIC_EXPORT=false`.
- **nazwa.pl (statyczny eksport)**: `npm run build:static`, artefakty w `out/` (instrukcja w `DEPLOY.md`).

## Roadmap (skrót)
- 2025: stabilizacja danych, audyt SEO/Performance, automatyzacja QA, monitoring.
- 2026: pełna PWA (offline, push, sync), tryb low-data, usprawnienia dostępności AA.
Szczegóły: patrz `ROADMAP.md`.

## Licencja
Wszelkie prawa zastrzeżone © 2024-2026 Tomasz Chromy.  
Użycie komercyjne wymaga zgody autora. Pełny tekst: `LICENSE`.
```bash
npm run build:static
# Pliki w folderze 'out' - wgraj przez FTP
```

## 📁 Struktura Projektu

```
fusionfinance.pl/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── artykul/           # Strony artykułów
│   ├── rynki/             # Sekcja Rynki
│   ├── gielda/            # Sekcja Giełda
│   ├── crypto/            # Sekcja Crypto
│   ├── waluty/            # Sekcja Waluty
│   └── analizy/           # Sekcja Analizy
├── components/            # Komponenty React
├── lib/                   # Utilities i konfiguracja
├── public/                # Pliki statyczne
│   └── api/              # PHP fallback API
├── prisma/               # Schema bazy danych
└── scripts/              # Skrypty build
```

## 🔧 Dostępne Skrypty

```bash
npm run dev           # Serwer deweloperski
npm run build         # Build produkcyjny
npm run build:static  # Build dla hostingu statycznego
npm run start         # Uruchom produkcyjnie
npm run lint          # Sprawdź kod z ESLint
```

## 📱 Responsywność

| Breakpoint | Szerokość | Układ |
|------------|-----------|-------|
| Mobile | < 640px | 1 kolumna |
| Tablet | 640px - 1024px | 2 kolumny |
| Desktop | > 1024px | Golden Ratio (61.8% / 38.2%) |

## 🎨 Design System

```css
/* Kolory */
--gold-primary: #c9a962
--gold-light: #e4d4a5
--gold-dark: #9a7b3c
--bg-primary: #08090c
--bg-secondary: #0c0d10

/* Typography */
font-serif: Playfair Display (nagłówki)
font-sans: Geist (treść)
```

## 📚 Dokumentacja

- 📖 **[Roadmap](./ROADMAP.md)** - Plan rozwoju projektu
- ⚖️ **[Licencja](./LICENSE)** - Prawa autorskie

## 📞 Kontakt i Wsparcie

**Tomasz Chromy** - Autor i Twórca
- 🌐 Strona: [tomaszchromy.com](https://tomaszchromy.com)
- 📧 Email: tomasz.chromy@outlook.com

W przypadku problemów lub pytań:
- Utwórz [Issue na GitHub](https://github.com/TomaszChromy/fusionfinance.pl/issues)
- Wyślij email z opisem problemu

## ⚖️ Licencja i Prawa Autorskie

**Copyright © 2024-2025 Tomasz Chromy. Wszelkie prawa zastrzeżone.**

Ten projekt jest własnością intelektualną Tomasza Chromy. Szczegółowe informacje o prawach autorskich i licencji znajdują się w pliku [LICENSE](./LICENSE).

### Dozwolone:
- ✅ Przeglądanie kodu źródłowego
- ✅ Uczenie się z kodu
- ✅ Tworzenie forków do celów edukacyjnych

### Zabronione bez pisemnej zgody:
- ❌ Komercyjne wykorzystanie
- ❌ Redystrybucja kodu
- ❌ Używanie nazwy "FusionFinance"

## ⚠️ Disclaimer

> **Ten projekt został stworzony w celach edukacyjnych i demonstracyjnych.**
> Nie stanowi oferty handlowej ani porady inwestycyjnej.
> Wszystkie dane finansowe pochodzą z publicznych źródeł RSS.

---

<p align="center">
  <strong><a href="https://tomaszchromy.com">POWERED BY TOMASZ CHROMY</a></strong>
</p>

<p align="center">
  <em>FusionFinance.pl - Luksusowy Portal Finansowy</em>
</p>
<!-- Deploy fix test -->
# RiderProjects-fusionfinance.pl
