# Release Notes (draft)

## Wersja: RC snapshot
- Build: https://fusionfinance-static-qmmkok2yl-tomasz-s-projects-587fbd1b.vercel.app
- Alias: fusionfinance.pl / www.fusionfinance.pl

### Zmiany
- CI dodane (lint, typecheck, build, e2e smoke Playwright).
- Naprawy Prisma import / build (`prisma generate` w build).
- Typowanie API recommendations.
- Dok. STATUS/ROADMAP/QA checklist.
- Nowe layouty (jasne) dla home/kategorii (Polska, Świat, Analizy, Crypto, Waluty) z listami „Załaduj więcej”; reading mode artykułu + powiązane.
- A11y/perf: lazy images, focus-visible, aria-label search.
- Ciemny motyw ujednolicony na wszystkich kluczowych podstronach, CTA/focus oparte na `--accent`, usunięte stare złote akcenty.
- VERCEL_BYPASS_TOKEN ustawiony (preview + production) + nagłówek bypass w `next.config.ts`.

### Znane ograniczenia / TODO
- Integracje (Google/Stripe/Resend/OpenAI) celowo pominięte — dodać sekrety przed użyciem funkcji.
- Reguła Vercel "git author" — na planie Hobby stosować push-to-deploy z konta właściciela lub workaround `.git_tmp` przy ręcznym deploy.
- Playwright browsers instalowane on-demand w CI; lokalnie można wykonać `npx playwright install chromium`.

### QA skrót
- Smoke E2E (Playwright, BASE_URL=https://www.fusionfinance.pl, VERCEL_BYPASS_TOKEN aktywny) — ✅ 5/5 ścieżek.
- CI nadal uruchamia smoke przeciwko https://fusionfinance-static.vercel.app (bez ochrony).
- Manual smoke (desktop, prod build): header/nav + ticker OK; widoki /, /polska, /swiat, /gielda, /waluty/eur-pln, /artykul bez błędów konsoli; formularze logowanie/rejestracja/kontakt render OK (backend auth nieaktywny); CTA/hover/focus spójne z akcentem.
- Patrz `docs/QA_CHECKLIST.md`.


### Lighthouse (mobile, 1 run, https://fusionfinance-static.vercel.app)
- Performance: 61
- Accessibility: 90
- Best Practices: 75
- SEO: 100

Raport HTML: `lhci-report/fusionfinance_static_vercel_app--2026_02_18_02_29_45.report.html`
