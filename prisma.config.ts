// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
    // Use 'as any' to bypass the temporary V7 type mismatch
    directUrl: process.env["DIRECT_URL"],
  } as any,
});