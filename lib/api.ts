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
 * Check if we should use Next.js API routes
 * Returns true for: localhost, Vercel, or any Node.js hosting
 * Returns false for: static hosting with PHP backend
 */
export function shouldUseNextApi(): boolean {
  // Static export / PHP backend explicitly requested via env
  const envForcesPhpApi =
    typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ||
      process.env.STATIC_EXPORT === "true" ||
      process.env.NEXT_PUBLIC_USE_PHP_API === "true");

  if (envForcesPhpApi) return false;

  if (typeof window === "undefined") return true; // SSR - always use Next.js API

  const { hostname, port } = window.location;

  // Localhost with Next.js dev server
  if ((hostname === "localhost" || hostname === "127.0.0.1") && (port === "3000" || port === "3001")) {
    return true;
  }

  // Vercel deployment (*.vercel.app or custom domain on Vercel)
  if (hostname.endsWith(".vercel.app") || hostname.includes("vercel")) {
    return true;
  }

  // Custom domains on Vercel: default to Next API; static hosts must opt-in via env flag
  return true;
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

  // Build both URLs: prefer Next API, fallback to PHP (for static hosting)
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => search.set(key, String(value)));

  const primaryUrl = getApiUrl("rss", params);
  const fallbackUrl = primaryUrl.endsWith(".php") ? `/api/rss?${search.toString()}` : `/api/rss.php?${search.toString()}`;
  const urls = [primaryUrl, fallbackUrl];

  let lastError: unknown;

  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        lastError = new Error(`API error: ${response.status} ${response.statusText}`);
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
