# Roadmap (release focus)

## Must-have przed produkcją (Release Candidate)
- P0: Naprawa builda Vercel (TS błąd PrismaClient w `lib/auth.ts`).
- P0: Stabilny deploy prod (bez ręcznego ukrywania `.git` – dodać autora do teamu lub skonfigurować Vercel CI via Git).
- P1: Uzupełnione env prod/preview: `AUTH_SECRET/NEXTAUTH_SECRET`, `DATABASE_URL`, Google OAuth, Stripe, Resend, OpenAI/FUSION_OPENAI_API_KEY, CRON_SECRET, SEO public vars.
- P1: Sprawdzenie kluczowych ścieżek (landing, artykuł, logowanie/rejestracja, ulubione, wyszukiwarka).
- P1: SEO sanity: title/description, og:image, sitemap/robots (już są), favicon/manifest ok.
- P2: Lint/typecheck w CI, podstawowe testy krytycznych API (rss, analytics) – do dodania GH Actions.

## Nice-to-have (po RC)
- Monitoring uptime/error (Sentry/Logflare) z redaction PII.
- Testy E2E (Playwright) ścieżek: home, artykuł, szukaj, ulubione, build:static.
- PWA enhancements (service worker v2, offline cache, push) — zgodnie z długoterminową roadmapą.
- Edge/HTTP cache dla wybranych API (bez łamania hostingu współdzielonego w trybie static export).

## Długoterminowe (zgodne z repo ROADMAP.md)
- Stabilizacja feedów i sanity checks (2025 H1).
- Analityka produktu i preferencje użytkowników (2025 H2).
- PWA full (offline, push, sync) 2026.

