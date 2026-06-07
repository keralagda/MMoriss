import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export async function checkDbConnection() {
  try {
    // Try a simple query to verify connection
    await db.$queryRaw`SELECT 1`;
    return { success: true };
  } catch (error: any) {
    console.error("Database connection check failed:", error);
    return {
      success: false,
      error: error?.message || 'Database connection error',
      diagnosticTrace: {
        steps: [
          "1. Check DB Container Status: Verify if the database server (CockroachDB/Postgres) is running and accessible.",
          "2. Verify Network Bridge: Test routing between the client and database server (check ports/firewall).",
          "3. Validate .env mapping: Verify DATABASE_URL structure and credentials in the .env file."
        ]
      }
    };
  }
}