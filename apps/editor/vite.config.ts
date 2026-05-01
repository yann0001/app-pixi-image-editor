import basicSsl from "@vitejs/plugin-basic-ssl";
import { createBaseConfig, createPWAConfig, createReactConfig, mergeConfigs } from "@config/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig, mergeConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = mergeConfigs([
    createBaseConfig(),
    createReactConfig({ enableReactCompiler: command === "build" }),
    createPWAConfig({
      manifest: {
        name: "Pixi Image Editor",
        shortName: "Pixi Editor",
        description:
          "React web application using PixiJS to create a basic image editor. The editor can load an image and contains several different tools and mechanics to view and adjust the content.",
        themeColor: "#ffffff",
        backgroundColor: "#ffffff",
      },
    }),
    {
      plugins: [tanstackRouter({ routeToken: "route" })],
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
        plugins: [basicSsl()],
        server: {
          strictPort: true,
          hmr: {
            overlay: false,
          },
        },
      });
  }
});
