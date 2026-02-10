# 🚀 FusionFinance.pl - Deployment Scripts Guide

## 📋 Przegląd

Dostępne są 2 skrypty do wgrywania plików na serwer:

1. **`deploy-api.sh`** - Szybkie wgrywanie tylko plików API (ZALECANE)
2. **`deploy.sh`** - Pełny skrypt z menu i dodatkowymi opcjami

---

## ⚡ Szybkie wgrywanie API (ZALECANE)

### Użycie:
```bash
./deploy-api.sh
```

Zostaniesz poproszony o hasło do serwera.

### Co robi:
- Wgrywa `out/api/rss.php` → serwer
- Wgrywa `out/api/cron.php` → serwer (jeśli istnieje)
- Wgrywa `out/api/counter.php` → serwer (jeśli istnieje)

### Wymagania:
- Hasło do serwera
- Pliki w katalogu `out/api/`

---

## 🔧 Pełny skrypt deployment (deploy.sh)

### Użycie:
```bash
./deploy.sh
```

### Menu opcji:
```
1) Wgraj API (rss.php, cron.php, counter.php)
2) Wgraj tylko rss.php
3) Wgraj tylko cron.php
4) Wgraj tylko counter.php
5) Wgraj całą stronę (out/)
6) Testuj połączenie SSH
7) Wyświetl logi serwera
8) Wyczyść cache na serwerze
9) Konfiguruj klucz SSH
0) Wyjście
```

---

## 🔑 Konfiguracja klucza SSH (OPCJONALNIE - automatyzacja bez hasła)

Jeśli chcesz, aby skrypty działały **bez pytania o hasło**, skonfiguruj klucz SSH:

### Krok 1: Wygeneruj klucz SSH
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/fusionfinance_rsa -N ""
```

### Krok 2: Wyświetl klucz publiczny
```bash
cat ~/.ssh/fusionfinance_rsa.pub
```

### Krok 3: Dodaj klucz na serwerze
```bash
# Zaloguj się na serwer
ssh fusionfinance.pl@s153.cyber-folks.pl

# Utwórz katalog .ssh (jeśli nie istnieje)
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Dodaj klucz publiczny
nano ~/.ssh/authorized_keys
# Wklej klucz publiczny z kroku 2

# Ustaw uprawnienia
chmod 600 ~/.ssh/authorized_keys

# Wyloguj się
exit
```

### Krok 4: Testuj połączenie bez hasła
```bash
ssh -i ~/.ssh/fusionfinance_rsa fusionfinance.pl@s153.cyber-folks.pl
```

Po skonfigurowaniu klucza SSH, skrypty będą działać **automatycznie bez pytania o hasło**!

---

## 📦 Ręczne wgrywanie (bez skryptów)

### Przez SCP (terminal):
```bash
# Wgraj rss.php
scp out/api/rss.php fusionfinance.pl@s153.cyber-folks.pl:domains/fusionfinance.pl/public_html/api/

# Wgraj cron.php
scp out/api/cron.php fusionfinance.pl@s153.cyber-folks.pl:domains/fusionfinance.pl/public_html/api/

# Wgraj counter.php
scp out/api/counter.php fusionfinance.pl@s153.cyber-folks.pl:domains/fusionfinance.pl/public_html/api/
```

### Przez SFTP (FileZilla/WinSCP):
1. **Host:** `s153.cyber-folks.pl`
2. **User:** `fusionfinance.pl`
3. **Hasło:** `[twoje hasło]`
4. **Ścieżka:** `domains/fusionfinance.pl/public_html/api/`
5. Wgraj pliki z `out/api/` → `api/`

---

## ✅ Weryfikacja po wgraniu

### Test API w przeglądarce:
```
https://fusionfinance.pl/api/rss?feed=polska&limit=6
```

### Oczekiwany wynik:
```json
{
  "success": true,
  "source": "live",
  "count": 6,
  "articles": [...]
}
```

### Sprawdź logi błędów:
```bash
ssh fusionfinance.pl@s153.cyber-folks.pl
tail -f domains/fusionfinance.pl/logs/error.log
```

---

## 🐛 Rozwiązywanie problemów

### Problem: "Permission denied (publickey,password)"
**Rozwiązanie:** Sprawdź hasło lub skonfiguruj klucz SSH (patrz wyżej)

### Problem: "Connection timeout"
**Rozwiązanie:** Sprawdź połączenie internetowe lub firewall

### Problem: API zwraca 400 Bad Request
**Rozwiązanie:** 
```bash
# 1. Sprawdź czy plik został wgrany
ssh fusionfinance.pl@s153.cyber-folks.pl "ls -la domains/fusionfinance.pl/public_html/api/rss.php"

# 2. Sprawdź logi
ssh fusionfinance.pl@s153.cyber-folks.pl "tail domains/fusionfinance.pl/logs/error.log"

# 3. Wyczyść cache
ssh fusionfinance.pl@s153.cyber-folks.pl "rm -f domains/fusionfinance.pl/public_html/api/articles_cache.json"
```

---

## 🔗 Przydatne komendy

```bash
# Sprawdź pliki na serwerze
ssh fusionfinance.pl@s153.cyber-folks.pl "ls -la domains/fusionfinance.pl/public_html/api/"

# Pobierz plik z serwera (backup)
scp fusionfinance.pl@s153.cyber-folks.pl:domains/fusionfinance.pl/public_html/api/rss.php backup_rss.php

# Wyczyść cache
ssh fusionfinance.pl@s153.cyber-folks.pl "rm -f domains/fusionfinance.pl/public_html/api/articles_cache.json"

# Sprawdź logi (ostatnie 100 linii)
ssh fusionfinance.pl@s153.cyber-folks.pl "tail -n 100 domains/fusionfinance.pl/logs/error.log"

# Testuj API z terminala
curl "https://fusionfinance.pl/api/rss?feed=polska&limit=6"
```

---

**Powodzenia! 🚀**

