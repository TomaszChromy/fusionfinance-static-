# 🚀 Deployment na Vercel

Instrukcja uruchomienia produkcyjnego pipeline’u Vercel (SSR, bez statycznego eksportu).

## 1) Utwórz projekt
- Zaloguj się do Vercel i wybierz **Add New Project → Import Git Repository**.
- Wskaż repo `fusionfinance.pl`.
- W zakładce **Framework Preset** wybierz **Next.js**.
- **Install Command:** `npm install`
- **Build Command:** `prisma generate && next build`
- **Output Directory:** `.vercel/output` (ustawia się automatycznie dla Next.js 13+).
- **Serverless/Edge:** zostaw domyślne (SSR; brak `output: export` bo `STATIC_EXPORT=false`).

## 2) Ustaw zmienne środowiskowe
Wprowadź poniższe klucze w Vercel → Settings → Environment Variables.

| Klucz | Wartość (przykład) | Notatka |
| --- | --- | --- |
| `STATIC_EXPORT` | `false` | Wymusza SSR |
| `NEXT_PUBLIC_STATIC_EXPORT` | `false` | UI wie, że to tryb SSR |
| `NEXT_PUBLIC_USE_PHP_API` | `false` | Wymusza Next API zamiast PHP fallback |
| `AUTH_SECRET` | `openssl rand -base64 32` | NextAuth |
| `NEXTAUTH_URL` | `https://fusionfinance.pl` (prod) / `https://<preview>.vercel.app` (preview) | Pamiętaj o Preview |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/dbname` | Wymagane dla Prisma |
| `GOOGLE_CLIENT_ID` | ... | OAuth |
| `GOOGLE_CLIENT_SECRET` | ... | OAuth |
| `RESEND_API_KEY` | ... | E-mail |
| `STRIPE_SECRET_KEY` | ... | Stripe |
| `STRIPE_WEBHOOK_SECRET` | ... | Stripe Webhooks |
| `FUSION_OPENAI_API_KEY` | ... | AI |
| `OPENAI_API_KEY` | ... | AI (fallback) |
| `CRON_SECRET` | `ff_cron_2024_secret` lub inny | Crony (jeśli używasz) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | opcjonalne | SEO |
| `NEXT_PUBLIC_MSVALIDATE_01` | opcjonalne | SEO |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | opcjonalne | SEO |

TIP: ustaw osobne wartości dla **Preview** i **Production** (przynajmniej `NEXTAUTH_URL`, ewentualnie oddzielne DB).

## 3) Domeny
- Dodaj `fusionfinance.pl` w Vercel → Settings → Domains.
- Ustaw DNS: `A` / `AAAA` na Vercel lub `CNAME www → cname.vercel-dns.com`.
- Włącz **Redirect www → root** w ustawieniach domeny.

## 4) Git-based pipeline
- Każdy push do `main` → **Production Deployment**.
- Każdy PR/branch → **Preview Deployment** (`<branch>.<project>.vercel.app`).
- Możesz pobrać env do lokalnego dev: `vercel env pull .env.local`.

## 5) Walidacja
- Po pierwszym buildzie sprawdź logi w Vercel (Prisma, DB).
- Zweryfikuj `/api/auth/session` (NextAuth) i publiczne strony.
- Jeśli używasz Stripe webhooks – ustaw endpoint `https://fusionfinance.pl/api/webhooks/stripe` w Stripe Dashboard i wklej `STRIPE_WEBHOOK_SECRET`.

## 6) Lokalny preview (opcjonalnie)
```bash
npm install -g vercel
vercel link          # przypisz lokalny katalog do projektu
vercel env pull .env.local
npm run dev
```

Gotowe – repo jest przygotowane pod ciągły deploy na Vercel bez dodatkowych zmian w kodzie.
