import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  // Servers are started by turbo (test:e2e:env) concurrently with this task.
  // global-setup.ui.ts waits for the port to be ready before tests run.
  globalSetup: "./global-setup.ui.ts",
  webServer: undefined,
});
