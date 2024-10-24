/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // This will allow all images from Cloudinary
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml", // When someone visits /sitemap.xml
        destination: "/sitemap", // Serve the sitemap from the app/sitemap/route.js
      },
    ];
  },
};

export default nextConfig;
