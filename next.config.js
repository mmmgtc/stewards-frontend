/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL + "/:path*",
      },
      {
        source: "/api.showkarma.xyz/:path*",
        destination: "https://api.showkarma.xyz/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
