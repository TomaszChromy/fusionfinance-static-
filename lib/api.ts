/**
 * API URL helper for deployment
 *
 * On Vercel/localhost: Uses Next.js API routes (/api/rss)
 * On static hosting with PHP: Uses PHP API (/api/rss.php)
 */

/**
 * Check if we're running on localhost (dev server)
 */
export function isLocalhost(): boolean {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  return hostname === "localhost" || hostname === "127.0.0.1";
}

/**
 * Decides which API to call.
 * - default: Next.js API (Vercel / localhost)
 * - when NEXT_PUBLIC_USE_PHP_API=true: prefer PHP endpoints (static hosting)
 */
export function shouldUseNextApi(): boolean {
  const usePhpApi = process.env.NEXT_PUBLIC_USE_PHP_API === "true";
  return !usePhpApi;
}

/**
 * @deprecated Use shouldUseNextApi() instead
 */
export function isNextDevServer(): boolean {
  return shouldUseNextApi();
}

/**
 * Get the correct API URL based on environment
 * @param endpoint - API endpoint (e.g., "rss", "article")
 * @param params - Query parameters
 */
export function getApiUrl(endpoint: string, params?: Record<string, string | number>): string {
  // Use Next.js API on Vercel and localhost
  const useNextApi = shouldUseNextApi();

  // Build base URL
  const baseUrl = useNextApi ? `/api/${endpoint}` : `/api/${endpoint}.php`;
  
  // Add query parameters
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, String(value));
    }
    return `${baseUrl}?${searchParams.toString()}`;
  }
  
  return baseUrl;
}

/**
 * Fetch from the correct API endpoint
 * @param endpoint - API endpoint (e.g., "rss", "article")
 * @param params - Query parameters
 * @param options - Fetch options
 */
export async function fetchApi<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  options?: RequestInit
): Promise<T> {
  const url = getApiUrl(endpoint, params);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const body = await response.text();
    throw new Error(`API error: expected JSON, got ${contentType || "unknown"}. Preview: ${body.slice(0, 80)}`);
  }

  return response.json();
}

/**
 * RSS API helper
 */
export function getRssApiUrl(feed: string, limit: number = 10): string {
  return getApiUrl("rss", { feed, limit });
}

/**
 * Article API helper
 */
export function getArticleApiUrl(url: string): string {
  return getApiUrl("article", { url });
}

/**
 * Fetch RSS (helper wrapping fetchApi)
 */
export async function fetchRss(feed: string, limit: number = 10) {
  const params = { feed, limit };

  const useNextApi = shouldUseNextApi();

  // Build both URLs: prefer Next API, fallback to PHP (for static hosting)
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => search.set(key, String(value)));

  const primaryUrl = getApiUrl("rss", params);

  // Determine fallback order based on deployment mode
  const urls: string[] = [primaryUrl];

  if (useNextApi) {
    // Optional fallback to PHP only if ktoś ręcznie wrzucił php na statycznym hoście
    urls.push(`/api/rss.php?${search.toString()}`);
  } else {
    // PHP primary, fallback to Next (dla dev/testów)
    urls.push(`/api/rss?${search.toString()}`);
  }

  let lastError: unknown;

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        lastError = new Error(`API error: ${response.status} ${response.statusText}`);
        continue;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const body = await response.text();
        lastError = new Error(`Invalid response (expected JSON, got ${contentType || "unknown"}) from ${url}. Preview: ${body.slice(0, 80)}`);
        continue;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Failed to fetch RSS");
}
