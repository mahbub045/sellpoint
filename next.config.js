const runtimeCaching = [
  {
    urlPattern: /^\/api\//,
    handler: "NetworkOnly",
    method: "GET",
    options: {
      cacheName: "api-calls",
    },
  },
  // You can add more rules here for other dynamic routes if needed
];

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add other Next.js config options here if needed
};

module.exports = withPWA(nextConfig);
