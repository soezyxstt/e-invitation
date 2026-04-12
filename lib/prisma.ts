import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";
import { Pool } from "pg";

const globalFor = globalThis as unknown as {
  pool: Pool | undefined;
  prisma: PrismaClient | undefined;
};

function getPool(): Pool {
  if (!globalFor.pool) {
    globalFor.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    });
  }
  return globalFor.pool;
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg(getPool());
  return new PrismaClient({ adapter });
}

export const prisma = globalFor.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalFor.prisma = prisma;
}
