// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

// Helper: derive base from env or package.json homepage
function deriveBase() {
  // 1) explicit env override
  if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;

  try {
    // 2) only use package.json homepage for production builds
    if (process.env.NODE_ENV !== "production") {
      // during local development, prefer '/'
      return "/";
    }

    // try to read homepage from package.json
    // compute project root relative to this config file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = join(__dirname, "package.json");
    const pkgRaw = readFileSync(pkgPath, "utf8");
    const pkg = JSON.parse(pkgRaw);
    if (pkg && typeof pkg.homepage === "string") {
      try {
        const url = new URL(pkg.homepage);
        // For GitHub Pages project sites the path will be something like /username/repo/
        return url.pathname.endsWith("/") ? url.pathname : url.pathname + "/";
      } catch (e) {
        // If homepage is not a full URL, treat it as a path
        if (pkg.homepage.startsWith("/")) return pkg.homepage;
        return (
          "/" +
          pkg.homepage.replace(/^\/+/, "") +
          (pkg.homepage.endsWith("/") ? "" : "/")
        );
      }
    }
  } catch (e) {
    // ignore and fallback to '/'
  }

  // 3) default for local dev
  return "/";
}

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Derive base automatically from ASTRO_BASE, package.json homepage, or default '/'.
  base: deriveBase(),
});
