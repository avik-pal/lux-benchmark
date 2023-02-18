/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: "edge",
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
