let cachedDevSecret: string | null = null;

const isStaticExport = process.env.STATIC_EXPORT === "true" || process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
const isProd = process.env.NODE_ENV === "production";

const getAuthSecret = (): string => {
  const value = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (value) return value;

  // During static export or production build we only need a placeholder to let the build finish.
  if (isStaticExport || isBuildPhase) {
    console.warn("[env] AUTH_SECRET not set (static export/build). Auth features will be disabled.");
    return `static-export-dummy-${Date.now()}`;
  }

  if (isProd) {
    throw new Error("Missing required env variable: AUTH_SECRET. Set it in production for Auth.js.");
  }

  if (!cachedDevSecret) {
    // Non-crypto fallback for dev only; regenerate per boot to silence MissingSecret noise
    cachedDevSecret = `dev-secret-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    console.warn("[env] AUTH_SECRET is not set. Using generated dev secret (do not use in production).");
  }
  return cachedDevSecret;
};

const getDatabaseUrl = (): string | undefined => {
  const value = process.env.DATABASE_URL;
  if (value) return value;

  // Allow missing DB URL during static export or build-time so marketing-only builds don't fail.
  if (isStaticExport || isBuildPhase) {
    console.warn("[env] DATABASE_URL not set (static export/build). Database features will be disabled.");
    return undefined;
  }

  if (isProd) {
    throw new Error("Missing required env variable: DATABASE_URL. Set it in production.");
  }
  console.warn("[env] DATABASE_URL not set. Some features (auth/db-backed content) will be disabled.");
  return undefined;
};

const optional = (key: string): string | undefined => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV !== "production") {
    // Helpful hint in dev; keep quiet in production logs
    console.warn(`[env] Optional variable ${key} is not set.`);
  }
  return value;
};

export const env = {
  authSecret: getAuthSecret(),
  nextauthUrl: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  databaseUrl: getDatabaseUrl(),
  googleClientId: optional("GOOGLE_CLIENT_ID"),
  googleClientSecret: optional("GOOGLE_CLIENT_SECRET"),
  stripeSecretKey: optional("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: optional("STRIPE_WEBHOOK_SECRET"),
  resendApiKey: optional("RESEND_API_KEY"),
  fusionOpenAiKey: optional("FUSION_OPENAI_API_KEY"),
  openAiKey: optional("OPENAI_API_KEY"),
  cronSecret: optional("CRON_SECRET"),
  googleSiteVerification: optional("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"),
  bingSiteVerification: optional("NEXT_PUBLIC_MSVALIDATE_01"),
  yandexSiteVerification: optional("NEXT_PUBLIC_YANDEX_VERIFICATION"),
  staticExport: optional("NEXT_PUBLIC_STATIC_EXPORT"),
  usePhpApi: optional("NEXT_PUBLIC_USE_PHP_API"),
};
