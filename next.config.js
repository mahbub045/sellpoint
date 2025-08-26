const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add other Next.js config options here if needed
};

module.exports = withPWA(nextConfig);
