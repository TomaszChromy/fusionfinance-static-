#!/bin/bash
# FusionFinance.pl - Quick API Deploy
# Szybkie wgrywanie plików API na serwer

# Kolory
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  FusionFinance.pl - API Deploy        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

SERVER="fusionfinance.pl@s153.cyber-folks.pl"
REMOTE_PATH="domains/fusionfinance.pl/public_html/api"

# Sprawdź czy pliki istnieją
if [ ! -f "out/api/rss.php" ]; then
    echo -e "${RED}✗ Błąd: out/api/rss.php nie istnieje!${NC}"
    exit 1
fi

echo -e "${BLUE}ℹ Wgrywam pliki API...${NC}"
echo ""

# Wgraj rss.php
echo "📤 Wgrywam rss.php..."
scp -o StrictHostKeyChecking=no out/api/rss.php "$SERVER:$REMOTE_PATH/rss.php"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ rss.php wgrane!${NC}"
else
    echo -e "${RED}✗ Błąd wgrywania rss.php${NC}"
    exit 1
fi

# Wgraj cron.php (jeśli istnieje)
if [ -f "out/api/cron.php" ]; then
    echo "📤 Wgrywam cron.php..."
    scp -o StrictHostKeyChecking=no out/api/cron.php "$SERVER:$REMOTE_PATH/cron.php"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ cron.php wgrane!${NC}"
    fi
fi

# Wgraj counter.php (jeśli istnieje)
if [ -f "out/api/counter.php" ]; then
    echo "📤 Wgrywam counter.php..."
    scp -o StrictHostKeyChecking=no out/api/counter.php "$SERVER:$REMOTE_PATH/counter.php"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ counter.php wgrane!${NC}"
    fi
fi

echo ""
echo -e "${GREEN}✓ Wszystkie pliki API wgrane pomyślnie!${NC}"
echo ""
echo "🔗 Testuj API:"
echo "   https://fusionfinance.pl/api/rss?feed=polska&limit=6"
echo ""

