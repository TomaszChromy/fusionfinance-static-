# STATUS (P0/P1)

## Blokery (P0)
- Vercel prod build: TypeScript błąd w `lib/auth.ts` ("PrismaClient" no exported member) – do fixu.
- Reguła Vercel "git author must have access" – wymaga workaround (tymczasowe ukrycie `.git`) lub dodania autora do zespołu (zalecane).

## Pilne (P1)
- Zweryfikować komplet envów prod/preview (Google/Stripe/Resend/AI/cron secrets) – obecnie brak lub placeholdery.
- Uporządkować build script w Vercel: `prisma generate && next build` (lokalnie poprawione w package.json, trzeba potwierdzić w Vercel).
- Ustawić docelowe `NEXTAUTH_URL` i `AUTH_SECRET` w prod (preview ma ustawione, prod częściowo).

## W toku / obserwacja
- Ostrzeżenia `DATABASE_URL not set (static export/build)` w lokalnym buildzie – informacyjne, oczekiwane gdy brak env w static-export; w prod mamy DB, więc ok.

