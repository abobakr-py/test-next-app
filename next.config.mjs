import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Enables App Router (default in Next.js 15+)
  },
  output: "standalone", // Required for AWS SSR deployments
  images: {
    unoptimized: true, // Disable image optimization if hosting on platforms without optimization
    domains: ["dev.sabika.app"], // Add your trusted image domains
  },
  eslint: {
    ignoreDuringBuilds: true, // Suppress ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Suppress TypeScript build errors
  },
};

export default withNextIntl(nextConfig);
