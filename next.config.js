/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "img.clerk.com",
      "utfs.io",
    ],
  },
};

module.exports = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};
