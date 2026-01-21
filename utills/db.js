let PrismaClient;
try {
  ({ PrismaClient } = require("@prisma/client"));
} catch (error) {
  ({ PrismaClient } = require("prisma-client-lib"));
}

const PrismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  const databaseUrl = process.env.DATABASE_URL;
  const url = new URL(databaseUrl);

  if (process.env.NODE_ENV === "development") {
    console.log(
      `Database connection: ${url.protocol}//${url.hostname}:${url.port || "3306"}`,
    );
    console.log(
      `🔒 SSL Mode: ${url.searchParams.get("sslmode") || "not specified"}`,
    );
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["warn", "error"],
  });
};

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? PrismaClientSingleton();
MediaSourceHandle.exports = prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
