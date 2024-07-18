// next.config.mjs
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.pexels.com', // Assurez-vous que c'est le bon hostname
          port: '',
          pathname: '/photos/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  