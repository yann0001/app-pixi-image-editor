import type { UserConfig } from "vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import { type ReactViteConfigOptions } from "./react";

export interface PWAViteConfigOptions extends ReactViteConfigOptions {
  /**
   * PWA configuration options
   */
  pwaOptions?: Partial<VitePWAOptions>;

  /**
   * App manifest configuration
   */
  manifest?: {
    name?: string;
    shortName?: string;
    description?: string;
    themeColor?: string;
    backgroundColor?: string;
  };
}

export function createPWAConfig(options: PWAViteConfigOptions = {}): UserConfig {
  const { pwaOptions = {}, manifest = {} } = options;

  const defaultPWAOptions: Partial<VitePWAOptions> = {
    devOptions: {
      enabled: false,
    },
    includeAssets: [
      "favicon.ico",
      "apple-touch-icon.png",
      "pwa-192x192.png",
      "pwa-512x512.png",
      "maskable-icon-512x512.png",
      "screenshot-desktop.png",
      "screenshot-mobile.png",
    ],
    injectRegister: "auto",
    manifest: {
      background_color: manifest.backgroundColor || "#1a1a2e",
      display: "standalone",
      description: manifest.description || "A web application for editing images.",
      name: manifest.name || "App",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      screenshots: [
        {
          src: "screenshot-desktop.png",
          sizes: "690x670",
          type: "image/png",
          form_factor: "wide",
          label: "App on Desktop",
        },
        {
          src: "screenshot-mobile.png",
          sizes: "435x608",
          type: "image/png",
          form_factor: "narrow",
          label: "App on Phone",
        },
      ],
      short_name: manifest.shortName || "App",
      theme_color: manifest.themeColor || "#fe6c90",
    },
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      navigateFallbackDenylist: [/storybook/],
    },
    ...pwaOptions,
  };

  return {
    plugins: [VitePWA(defaultPWAOptions)],
  } satisfies UserConfig;
}
