<?php
/**
 * FusionFinance.pl - PHP fallback dla listy artykułów (statyczny hosting)
 * Czyta articles_cache.json generowany przez cron.php i serwuje w formacie oczekiwanym przez frontend.
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$cacheFile = __DIR__ . '/articles_cache.json';

$limit = isset($_GET['limit']) ? max(1, min(100, intval($_GET['limit']))) : 14;
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($page - 1) * $limit;

if (!file_exists($cacheFile)) {
    echo json_encode([
        'items' => [],
        'total' => 0,
        'page' => $page,
        'limit' => $limit,
        'source' => 'no-cache'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

$data = json_decode(file_get_contents($cacheFile), true);
$articles = isset($data['articles']) && is_array($data['articles']) ? $data['articles'] : [];
$total = count($articles);
$selected = array_slice($articles, $offset, $limit);

$mapped = array_map(function($item) {
    $published = isset($item['timestamp']) ? date('c', intval($item['timestamp'])) : ($item['pubDate'] ?? date('c'));
    return [
        'id' => $item['id'] ?? ($item['link'] ?? uniqid('art_', true)),
        'slug' => '',
        'title' => $item['title'] ?? '',
        'summary' => $item['description'] ?? '',
        'coverImage' => $item['image'] ?? null,
        'category' => $item['category'] ?? null,
        'tags' => [],
        'source' => $item['source'] ?? null,
        'publishedAt' => $published,
        'author' => $item['author'] ?? null,
    ];
}, $selected);

echo json_encode([
    'items' => $mapped,
    'total' => $total,
    'page' => $page,
    'limit' => $limit,
    'source' => 'cache'
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
