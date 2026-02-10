#!/bin/bash
# FusionFinance.pl - Deployment Script
# Automatyczne wgrywanie plików na serwer przez SSH/SCP

# Kolory dla outputu
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Konfiguracja serwera
SERVER_HOST="s153.cyber-folks.pl"
SERVER_USER="fusionfinance.pl"
SERVER_PATH="domains/fusionfinance.pl/public_html"
SSH_KEY="$HOME/.ssh/fusionfinance_rsa"  # Ścieżka do klucza SSH (opcjonalny)

# Sprawdź czy używać klucza SSH czy hasła
USE_SSH_KEY=false
if [ -f "$SSH_KEY" ]; then
    USE_SSH_KEY=true
    SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=no"
else
    SSH_OPTS="-o StrictHostKeyChecking=no"
fi

# Funkcja wyświetlania komunikatów
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Sprawdź czy klucz SSH istnieje
check_ssh_key() {
    if [ ! -f "$SSH_KEY" ]; then
        log_warning "Klucz SSH nie istnieje: $SSH_KEY"
        log_info "Generuję nowy klucz SSH..."
        
        ssh-keygen -t rsa -b 4096 -f "$SSH_KEY" -N "" -C "fusionfinance-deploy"
        
        log_success "Klucz SSH wygenerowany: $SSH_KEY"
        log_warning "WAŻNE: Musisz dodać klucz publiczny do serwera!"
        echo ""
        echo "Wykonaj następujące kroki:"
        echo "1. Skopiuj klucz publiczny:"
        echo ""
        cat "${SSH_KEY}.pub"
        echo ""
        echo "2. Zaloguj się na serwer i dodaj go do ~/.ssh/authorized_keys:"
        echo "   ssh ${SERVER_USER}@${SERVER_HOST}"
        echo "   mkdir -p ~/.ssh"
        echo "   echo 'KLUCZ_PUBLICZNY' >> ~/.ssh/authorized_keys"
        echo "   chmod 700 ~/.ssh"
        echo "   chmod 600 ~/.ssh/authorized_keys"
        echo ""
        read -p "Naciśnij Enter gdy dodasz klucz do serwera..."
    fi
}

# Funkcja wgrywania pojedynczego pliku
upload_file() {
    local source=$1
    local dest=$2

    log_info "Wgrywam: $source → $dest"

    if [ ! -f "$source" ]; then
        log_error "Plik nie istnieje: $source"
        return 1
    fi

    scp $SSH_OPTS "$source" "${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/${dest}"

    if [ $? -eq 0 ]; then
        log_success "Wgrano: $dest"
    else
        log_error "Błąd wgrywania: $dest"
        return 1
    fi
}

# Funkcja wgrywania katalogu
upload_directory() {
    local source=$1
    local dest=$2

    log_info "Wgrywam katalog: $source → $dest"

    if [ ! -d "$source" ]; then
        log_error "Katalog nie istnieje: $source"
        return 1
    fi

    scp $SSH_OPTS -r "$source" "${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/${dest}"

    if [ $? -eq 0 ]; then
        log_success "Wgrano katalog: $dest"
    else
        log_error "Błąd wgrywania katalogu: $dest"
        return 1
    fi
}

# Funkcja wykonywania komendy na serwerze
remote_exec() {
    local command=$1

    log_info "Wykonuję na serwerze: $command"

    ssh $SSH_OPTS "${SERVER_USER}@${SERVER_HOST}" "$command"

    if [ $? -eq 0 ]; then
        log_success "Wykonano: $command"
    else
        log_error "Błąd wykonania: $command"
        return 1
    fi
}

# Menu główne
show_menu() {
    echo ""
    echo "╔════════════════════════════════════════╗"
    echo "║  FusionFinance.pl - Deploy Script     ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "1) Wgraj API (rss.php, cron.php, counter.php)"
    echo "2) Wgraj tylko rss.php"
    echo "3) Wgraj tylko cron.php"
    echo "4) Wgraj tylko counter.php"
    echo "5) Wgraj całą stronę (out/)"
    echo "6) Testuj połączenie SSH"
    echo "7) Wyświetl logi serwera"
    echo "8) Wyczyść cache na serwerze"
    echo "9) Konfiguruj klucz SSH"
    echo "0) Wyjście"
    echo ""
}

# Główna pętla programu
main() {
    check_ssh_key
    
    while true; do
        show_menu
        read -p "Wybierz opcję: " choice
        
        case $choice in
            1)
                log_info "Wgrywam wszystkie pliki API..."
                upload_file "out/api/rss.php" "api/rss.php"
                upload_file "out/api/cron.php" "api/cron.php"
                upload_file "out/api/counter.php" "api/counter.php"
                log_success "Wszystkie pliki API wgrane!"
                ;;
            2)
                upload_file "out/api/rss.php" "api/rss.php"
                ;;
            3)
                upload_file "out/api/cron.php" "api/cron.php"
                ;;
            4)
                upload_file "out/api/counter.php" "api/counter.php"
                ;;
            5)
                log_warning "To może zająć kilka minut..."
                upload_directory "out/*" ""
                ;;
            6)
                log_info "Testuję połączenie SSH..."
                remote_exec "echo 'Połączenie OK!' && pwd"
                ;;
            7)
                log_info "Pobieranie logów..."
                remote_exec "tail -n 50 domains/fusionfinance.pl/logs/error.log"
                ;;
            8)
                log_info "Czyszczenie cache..."
                remote_exec "rm -f ${SERVER_PATH}/api/articles_cache.json"
                log_success "Cache wyczyszczony!"
                ;;
            9)
                log_info "Klucz publiczny SSH:"
                cat "${SSH_KEY}.pub"
                ;;
            0)
                log_info "Do widzenia!"
                exit 0
                ;;
            *)
                log_error "Nieprawidłowa opcja!"
                ;;
        esac
    done
}

# Uruchom program
main

