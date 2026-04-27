import { createBaseConfig, createReactConfig, mergeConfigs } from "@config/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig, mergeConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = mergeConfigs([
    createBaseConfig(),
    createReactConfig({ enableReactCompiler: false }),
    {
      plugins: [
        VitePWA({
          devOptions: { enabled: false },
          includeAssets: [
            "favicon.ico",
            "apple-touch-icon.png",
            "pwa-192x192.png",
            "pwa-512x512.png",
            "screenshot-desktop.png",
            "screenshot-mobile.png",
          ],
          injectRegister: "auto",
          manifest: {
            background_color: "#ffffff",
            display: "standalone",
            description:
              "React web application using PixiJS to create a basic image editor. The editor can load an image and contains several different tools and mechanics to view and adjust the content.",
            name: "Pixi Image Editor",
            short_name: "Pixi Editor",
            theme_color: "#ffffff",
            icons: [
              { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
              { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
            ],
            screenshots: [
              {
                src: "screenshot-desktop.png",
                sizes: "1411x1170",
                type: "image/png",
                form_factor: "wide",
                label: "Pixi Image Editor",
              },
              {
                src: "screenshot-mobile.png",
                sizes: "390x673",
                type: "image/png",
                form_factor: "narrow",
                label: "Pixi Image Editor",
              },
            ],
          },
          registerType: "prompt",
          workbox: {
            globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          },
        }),
        tanstackRouter({ routeToken: "route" }),
      ],
    },
    { resolve: { dedupe: ["react", "react-dom"] } },
  ]);

  switch (command) {
    case "build":
      return mergeConfig(config, {
        base: "./",
      });
    case "serve":
      return mergeConfig(config, {
        server: {
          hmr: {
            overlay: false,
          },
        },
      });
  }
});
