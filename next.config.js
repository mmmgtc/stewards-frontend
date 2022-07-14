/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api.showkarma.xyz/:path*",
        destination: "https://api.showkarma.xyz/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
