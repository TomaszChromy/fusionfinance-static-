# STATUS (P0/P1)

## Blokery (P0)
- Reguła Vercel "git author must have access" – na planie Hobby używamy dwóch ścieżek: (a) deploy tylko z konta właściciela przez push (Git-based), (b) ręczny deploy z CLI z workaroundem `mv .git .git_tmp`.

## Pilne (P1)
- Zweryfikować komplet envów prod/preview (Google/Stripe/Resend/AI itp.) – pominięte na teraz zgodnie z decyzją.
- Build script Vercel: `prisma generate && next build` – ustawione w package.json; monitorować w kolejnych deployach.
- Ustawić docelowe `NEXTAUTH_URL` w prod na finalną domenę.

## W toku / obserwacja
- Ostrzeżenia `DATABASE_URL not set (static export/build)` w lokalnym buildzie – informacyjne, oczekiwane gdy brak env w static-export; w prod mamy DB, więc ok.
