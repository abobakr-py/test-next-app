/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  experimental: {
    appDir: true, // Enables App Router (default in Next.js 15+)
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  trailingSlash: true,
  
  productionBrowserSourceMaps: true, // Enable this for generating source maps
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
