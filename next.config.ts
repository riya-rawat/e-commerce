import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
    reactStrictMode: true,
    sassOptions: {
      includePaths: ['./styles'],  // Optionally include additional paths for SCSS
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com',
          port: '',
        },
      ],
    },
};

export default nextConfig;
