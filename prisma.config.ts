// FusionFinance.pl - Prisma Config
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Pooled connection for Prisma Client queries
    url: env("POSTGRES_PRISMA_URL"),
    // Direct connection for migrations and schema operations
    directUrl: env("POSTGRES_URL_NON_POOLING"),
  },
});
