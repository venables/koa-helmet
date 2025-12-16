import { defineConfig } from "vitest/config"

const koaVersions = ["koa-2", "koa-3"]
const helmetVersions = ["helmet-7", "helmet-8"]

export default defineConfig({
  test: {
    watch: false,
    projects: koaVersions.flatMap((koa) =>
      helmetVersions.map((helmet) => ({
        extends: true,
        test: {
          name: `${koa}-${helmet}`,
          include: ["**/*.test.ts"],
        },
        resolve: {
          alias: { koa, helmet },
        },
      })),
    ),
  },
})
