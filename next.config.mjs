/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",//standalone // Required for SSR deployments
    experimental: {
      appDir: true, // Enable App Directory (if using Next.js 14+)
    },
    images: {
      domains: ["jsonplaceholder.typicode.com"], // Allow fetching images from your API domains (if needed)
    },
  };
  
  export default nextConfig;
  