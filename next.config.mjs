// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/photos/**',
      },
    ],
    formats: ['image/webp'], 
  },
  productionBrowserSourceMaps: true, 
};

export default nextConfig;
