# QA Checklist (Release Smoke)

## Podstawowe ścieżki
- [ ] Landing: / — brak błędów w konsoli, widoczne sekcje news/rynki.
- [ ] Artykuł statyczny: /artykuly/strategia-dywidendowa-2025 — treść, breadcrumbs, meta.
- [ ] Logowanie: /logowanie — formularz renderuje się, brak 500.

## API / backend (smoke)
- [ ] /api/rss?feed=polska&limit=3 — 200 + JSON (lub fallback, bez 5xx).
- [ ] /api/analytics/page-view — 200 (lub oczekiwany kod, brak 500).
- [ ] /api/auth/session — 200/401 zgodnie z kontekstem (brak 500).

## SEO
- [ ] robots.txt dostępny, sitemap.xml dostępna.
- [ ] Meta title/description obecne na landing i artykule.

## Performance (szybki rzut oka)
- [ ] LCP na mobile < ~3s na preview (Lighthouse szybki run wystarcza jako notatka).

## Deploy/infra
- [ ] Build Vercel Production: ✅
- [ ] Alias fusionfinance.pl wskazuje na ostatni deploy: ✅
- [ ] CI (lint/typecheck/build + e2e smoke) zielone na PR/main.

Uwagi/defekty:
- [ ] ...
