import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    projects: [
      {
        extends: true,
        test: {
          name: "koa-v2",
          include: ["test/**/*.spec.ts"],
        },
        resolve: {
          alias: {
            koa: "koa-2",
          },
        },
      },
      {
        extends: true,
        test: {
          name: "koa-v3",
          include: ["test/**/*.spec.ts"],
        },
        resolve: {
          alias: {
            koa: "koa-3",
          },
        },
      },
    ],
  },
});
