import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const logoDir = join(root, "src/assets/images/logo");
const publicDir = join(root, "public");

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

execSync("pnpm pwa-assets-generator --config pwa-assets.config.ts", {
  cwd: root,
  stdio: "inherit",
});

// Map generated file names → target public/ names
const assets = [
  ["favicon.ico", "favicon.ico"],
  ["apple-touch-icon-180x180.png", "apple-touch-icon.png"],
  ["pwa-192x192.png", "pwa-192x192.png"],
  ["pwa-512x512.png", "pwa-512x512.png"],
  ["maskable-icon-512x512.png", "maskable-icon-512x512.png"],
];

for (const [src, dest] of assets) {
  const srcPath = join(logoDir, src);
  const destPath = join(publicDir, dest);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} → public/${dest}`);
  }
}
