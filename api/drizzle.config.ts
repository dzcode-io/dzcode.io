import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/**/*table.ts",
  out: "./db/migrations",
  dialect: "sqlite",
});
