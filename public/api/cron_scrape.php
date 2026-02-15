<?php
/**
 * CRON Job - Scraping pełnych artykułów i zapis do bazy PostgreSQL
 * 
 * Uruchamiany co 30 minut
 * 
 * Konfiguracja na nazwa.pl:
 * Panel DirectAdmin -> Zaplanowane zadania (Cron Jobs)
 * */30 * * * * /usr/bin/php /home/USER/domains/fusionfinance.pl/public_html/api/cron_scrape.php
 * 
 * Lub przez wget:
 * */30 * * * * wget -q -O /dev/null "https://fusionfinance.pl/api/cron_scrape.php?key=ff_scrape_2025_Kx9mP4vL"
 */

header('Content-Type: application/json; charset=utf-8');
set_time_limit(600); // 10 minut timeout (scraping może trwać długo)

// Security key
$CRON_SECRET_KEY = 'ff_scrape_2025_Kx9mP4vL';

if (isset($_GET['key']) && $_GET['key'] !== $CRON_SECRET_KEY) {
    http_response_code(403);
    die(json_encode(['error' => 'Invalid key']));
}

// Pliki
$logFile = __DIR__ . '/cron_scrape_log.txt';
$processedFile = __DIR__ . '/processed_articles.json'; // Lista już przetworzonych artykułów

// RSS Feeds - tylko najlepsze polskie źródła
$RSS_FEEDS = [
    ['url' => 'https://www.bankier.pl/rss/wiadomosci.xml', 'source' => 'Bankier.pl', 'category' => 'Finanse'],
    ['url' => 'https://www.money.pl/rss/rss.xml', 'source' => 'Money.pl', 'category' => 'Gospodarka'],
    ['url' => 'https://www.gpw.pl/rss_aktualnosci', 'source' => 'GPW', 'category' => 'Giełda'],
    ['url' => 'https://www.parkiet.com/rss/parkiet.xml', 'source' => 'Parkiet', 'category' => 'Giełda'],
    ['url' => 'https://forsal.pl/.feed', 'source' => 'Forsal', 'category' => 'Gospodarka'],
    ['url' => 'https://www.rp.pl/rss/ekonomia', 'source' => 'Rzeczpospolita', 'category' => 'Ekonomia'],
    ['url' => 'https://mybank.pl/news/wiadomosci-rss.xml', 'source' => 'MyBank', 'category' => 'Finanse'],
];

function logMessage($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND | LOCK_EX);
}

// Załaduj listę już przetworzonych artykułów
function loadProcessedArticles() {
    global $processedFile;
    if (!file_exists($processedFile)) {
        return [];
    }
    $data = json_decode(file_get_contents($processedFile), true);
    return is_array($data) ? $data : [];
}

// Zapisz przetworzone artykuły
function saveProcessedArticles($processed) {
    global $processedFile;
    // Ogranicz do ostatnich 1000 artykułów (żeby plik nie rósł w nieskończoność)
    $processed = array_slice($processed, -1000);
    file_put_contents($processedFile, json_encode($processed, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

// Pobierz pojedynczy RSS feed
function fetchRSS($url) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT => 'FusionFinance Scraper/1.0',
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $content = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return ($content !== false && $httpCode === 200) ? $content : null;
}

// Parsuj RSS
function parseRSS($content, $source, $category) {
    if (!$content) return [];
    
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($content);
    if (!$xml) return [];
    
    $articles = [];
    $items = $xml->channel->item ?? $xml->item ?? [];
    
    foreach ($items as $item) {
        $title = trim((string)($item->title ?? ''));
        $link = trim((string)($item->link ?? ''));
        $description = strip_tags(trim((string)($item->description ?? '')));
        $pubDate = (string)($item->pubDate ?? date('r'));
        
        if (empty($title) || empty($link)) continue;
        
        // Obrazek
        $image = '';
        if (isset($item->enclosure['url'])) {
            $image = (string)$item->enclosure['url'];
        } elseif (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/', (string)$item->description, $matches)) {
            $image = $matches[1];
        }
        
        $articles[] = [
            'id' => md5($link),
            'title' => $title,
            'description' => $description,
            'link' => $link,
            'source' => $source,
            'category' => $category,
            'pubDate' => $pubDate,
            'image' => $image,
        ];
    }
    
    return $articles;
}

// Scrapuj pełną treść artykułu
function scrapeArticleContent($url) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $html = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($html === false || $httpCode !== 200) {
        return null;
    }
    
    // Selektory dla różnych źródeł
    $selectors = [
        'bankier.pl' => '/<div[^>]*class="[^"]*o-article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i',
        'money.pl' => '/<div[^>]*class="[^"]*wp-main-article[^"]*"[^>]*>([\s\S]*?)<\/div>/i',
        'gpw.pl' => '/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i',
        'parkiet.com' => '/<div[^>]*class="[^"]*article__content[^"]*"[^>]*>([\s\S]*?)<\/div>/i',
        'forsal.pl' => '/<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i',
        'rp.pl' => '/<article[^>]*>([\s\S]*?)<\/article>/i',
        'mybank.pl' => '/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i',
    ];
    
    // Znajdź odpowiedni selektor
    $content = '';
    foreach ($selectors as $domain => $pattern) {
        if (strpos($url, $domain) !== false) {
            if (preg_match($pattern, $html, $matches)) {
                $content = $matches[1];
                break;
            }
        }
    }
    
    if (empty($content)) {
        // Fallback - spróbuj znaleźć <article>
        if (preg_match('/<article[^>]*>([\s\S]*?)<\/article>/i', $html, $matches)) {
            $content = $matches[1];
        }
    }
    
    if (empty($content)) {
        return null;
    }
    
    // Czyszczenie HTML
    $content = cleanArticleContent($content);

    return $content;
}

// Czyszczenie treści artykułu
function cleanArticleContent($html) {
    // Usuń skrypty, style, formularze
    $html = preg_replace('/<script[^>]*>[\s\S]*?<\/script>/i', '', $html);
    $html = preg_replace('/<style[^>]*>[\s\S]*?<\/style>/i', '', $html);
    $html = preg_replace('/<form[^>]*>[\s\S]*?<\/form>/i', '', $html);
    $html = preg_replace('/<svg[^>]*>[\s\S]*?<\/svg>/i', '', $html);

    // Usuń obrazki i ich opisy
    $html = preg_replace('/Kliknij aby powiększyć[^•\n]*/i', '', $html);
    $html = preg_replace('/Zdjęcie ilustracyjne[^•\n]*/i', '', $html);
    $html = preg_replace('/<img[^>]*>/i', '', $html);

    // Usuń nawigację i breadcrumbs
    $html = preg_replace('/Strona główna[›>][^\n]*/i', '', $html);

    // Usuń autora, newsletter, "Najpopularniejsze"
    $html = preg_replace('/Opracowanie:[^\n]*/i', '', $html);
    $html = preg_replace('/Autor:[^\n]*/i', '', $html);
    $html = preg_replace('/Redakcja:[^\n]*/i', '', $html);
    $html = preg_replace('/Najpopularniejsze w BUSINESS INSIDER[\s\S]*/i', '', $html);
    $html = preg_replace('/Newsletter[\s\S]*ze świata biznesu i finansów[\s\S]*/i', '', $html);
    $html = preg_replace('/Dziękujemy, że przeczytałaś\/eś nasz artykuł do końca\.[\s\S]*/i', '', $html);
    $html = preg_replace('/Czy ten artykuł był pomocny\?[\s\S]*/i', '', $html);
    $html = preg_replace('/Zobacz także:[^\n]*\n/i', '', $html);
    $html = preg_replace('/Czytaj także w [A-Z\s]+\n/i', '', $html);

    // Konwertuj HTML na tekst
    $html = preg_replace('/<br\s*\/?>/i', "\n", $html);
    $html = preg_replace('/<\/p>/i', "\n\n", $html);
    $html = preg_replace('/<\/div>/i', "\n", $html);
    $html = preg_replace('/<\/h[1-6]>/i', "\n\n", $html);
    $html = preg_replace('/<li[^>]*>/i', "• ", $html);
    $html = preg_replace('/<\/li>/i', "\n", $html);

    // Usuń pozostałe tagi HTML
    $html = strip_tags($html);

    // Dekoduj HTML entities
    $html = html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8');

    // Czyszczenie białych znaków
    $html = preg_replace('/\t+/', ' ', $html);
    $html = preg_replace('/ +/', ' ', $html);
    $html = preg_replace('/\n +/', "\n", $html);
    $html = preg_replace('/ +\n/', "\n", $html);
    $html = preg_replace('/\n{3,}/', "\n\n", $html);

    return trim($html);
}

// Zapisz artykuł do bazy przez API
function saveArticleToDatabase($article, $content) {
    global $CRON_SECRET_KEY;

    // Przygotuj dane
    $data = [
        'title' => $article['title'],
        'content' => $content,
        'summary' => $article['description'],
        'sourceUrl' => $article['link'],
        'source' => $article['source'],
        'category' => $article['category'],
        'coverImage' => $article['image'],
        'publishedAt' => $article['pubDate'],
    ];

    // Wywołaj API
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://fusionfinance.pl/api/articles/save',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $CRON_SECRET_KEY,
        ],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 201 || $httpCode === 200) {
        return json_decode($response, true);
    }

    return null;
}

// ============= GŁÓWNA LOGIKA =============

$startTime = microtime(true);
logMessage("=== CRON SCRAPE START ===");

$processed = loadProcessedArticles();
$stats = [
    'fetched' => 0,
    'scraped' => 0,
    'saved' => 0,
    'skipped' => 0,
    'errors' => 0,
];

// Pobierz RSS feeds
foreach ($RSS_FEEDS as $feed) {
    logMessage("Fetching RSS: {$feed['source']}");

    $rssContent = fetchRSS($feed['url']);
    if (!$rssContent) {
        logMessage("ERROR: Failed to fetch {$feed['source']}");
        continue;
    }

    $articles = parseRSS($rssContent, $feed['source'], $feed['category']);
    $stats['fetched'] += count($articles);
    logMessage("Found " . count($articles) . " articles from {$feed['source']}");

    // Przetwórz każdy artykuł (max 5 najnowszych z każdego źródła)
    $articles = array_slice($articles, 0, 5);

    foreach ($articles as $article) {
        // Sprawdź czy już przetworzony
        if (in_array($article['id'], $processed)) {
            $stats['skipped']++;
            continue;
        }

        logMessage("Scraping: {$article['title']}");

        // Scrapuj treść
        $content = scrapeArticleContent($article['link']);

        if (!$content) {
            logMessage("ERROR: Failed to scrape {$article['link']}");
            $stats['errors']++;
            continue;
        }

        $stats['scraped']++;

        // Sprawdź liczbę słów
        $wordCount = str_word_count($content);
        if ($wordCount < 500) {
            logMessage("SKIP: Too short ({$wordCount} words) - {$article['title']}");
            $stats['skipped']++;
            $processed[] = $article['id']; // Oznacz jako przetworzone żeby nie próbować ponownie
            continue;
        }

        // Zapisz do bazy
        $result = saveArticleToDatabase($article, $content);

        if ($result) {
            logMessage("SUCCESS: Saved ({$wordCount} words) - {$article['title']}");
            $stats['saved']++;
            $processed[] = $article['id'];
        } else {
            logMessage("ERROR: Failed to save to DB - {$article['title']}");
            $stats['errors']++;
        }

        // Pauza między requestami (żeby nie obciążać serwerów)
        sleep(2);
    }
}

// Zapisz listę przetworzonych
saveProcessedArticles($processed);

$duration = round((microtime(true) - $startTime) * 1000);
logMessage("=== CRON SCRAPE END === Duration: {$duration}ms");
logMessage("Stats: " . json_encode($stats));

// Response
echo json_encode([
    'success' => true,
    'duration' => $duration . 'ms',
    'stats' => $stats,
]);


