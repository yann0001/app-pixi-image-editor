import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const logoSrc = join(root, "src/assets/images/logo/logo.svg");
const publicDir = join(root, "public");
const logoTemp = join(publicDir, "logo.svg");

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Copy source SVG into public/ so the generator outputs directly there
copyFileSync(logoSrc, logoTemp);

try {
  execSync("pnpm pwa-assets-generator --config pwa-assets.config.ts", {
    cwd: root,
    stdio: "inherit",
  });

  // Generator names the apple icon with its size; rename to the expected filename
  const appleSrc = join(publicDir, "apple-touch-icon-180x180.png");
  const appleDest = join(publicDir, "apple-touch-icon.png");
  if (existsSync(appleSrc)) {
    renameSync(appleSrc, appleDest);
    console.log("Renamed apple-touch-icon-180x180.png → apple-touch-icon.png");
  }
} finally {
  // Always remove the temporary SVG copy from public/
  rmSync(logoTemp, { force: true });
}
