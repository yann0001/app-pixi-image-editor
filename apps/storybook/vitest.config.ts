import { createRequire } from "node:module";
import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const require = createRequire(import.meta.url);
const webAppSrc = path.resolve(path.dirname(require.resolve("@app/web/package.json")), "src");

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      allowExternal: true,
      include: ["**/apps/**/src/**/*.{ts,tsx}", "**/packages/ui/**/src/**/*.{ts,tsx}"],
      exclude: [
        "**/src/**/*.stories.{ts,tsx}",
        "**/src/**/*.test.{ts,tsx}",
        "**/src/**/*.spec.{ts,tsx}",
        "**/src/**/*.d.ts",
        "**/src/**/index.ts",
        "**/{storybook,Storybook}/**/*.{ts,tsx}",
        "**/apps/web/src/views/**",
        // PixiJS-dependent code — requires a WebGL context, untestable in Storybook
        "**/apps/web/src/components/editor/stage/**",
        "**/apps/web/src/components/editor/content/Content.tsx",
        "**/apps/web/src/components/editor/Editor.tsx",
        "**/apps/web/src/components/editor/atoms/viewport/FitScreenAtoms.ts",
        "**/apps/web/src/components/editor/atoms/viewport/ViewportAtoms.ts",
        "**/apps/web/src/components/editor/atoms/viewport/ViewportChangeAtoms.ts",
        "**/apps/web/src/components/editor/atoms/viewport/ViewportSetupAtoms.ts",
        "**/apps/web/src/core/image/CreateImage.ts",
      ],
      reporter: ["cobertura"],
    },
    projects: [
      {
        extends: true,
        resolve: {
          alias: {
            "~": webAppSrc,
          },
          dedupe: ["react", "react-dom"],
          tsconfigPaths: true,
        },
        optimizeDeps: {
          include: ["react/jsx-dev-runtime"],
        },
        plugins: [react(), tailwindcss(), storybookTest({ configDir: path.join(__dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
