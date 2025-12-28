import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 'domains' is deprecated. 'remotePatterns' is the new, more secure standard.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/gh/Ethereumistic/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "**", // Allows all images from this host
      },
    ],
  },
};

export default nextConfig;
