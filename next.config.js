/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["angganurprasetya.dev", "avatars3.githubusercontent.com"],
  },
};

module.exports = nextConfig;
