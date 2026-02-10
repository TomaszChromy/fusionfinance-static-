import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "./env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prismaClient: PrismaClient | undefined;

const createPrismaClient = () => {
  if (prismaClient) return prismaClient;

  if (globalForPrisma.prisma) {
    prismaClient = globalForPrisma.prisma;
    return prismaClient;
  }

  if (!env.databaseUrl) {
    throw new Error("[prisma] DATABASE_URL not set. Set it to connect to Postgres.");
  }

  const pool = new Pool({
    connectionString: env.databaseUrl,
  });
  const adapter = new PrismaPg(pool);
  prismaClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient;
  }

  return prismaClient;
};

// Lazy proxy so import time does not require DATABASE_URL during static builds.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = createPrismaClient();
    return Reflect.get(client, prop, receiver);
  },
});

export default prisma;
