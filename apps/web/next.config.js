/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ["@repo/ui"],
  distDir: "dist",
  images: {
    domains: [
      "125.133.34.224",
      "firebasestorage.googleapis.com",
      "web.hi-dice.com",
      "hi-dice.com",
      "file.hi-dice.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_SERVER_URL + "/api/:path*",
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
