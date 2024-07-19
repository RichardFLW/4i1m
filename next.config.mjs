import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
  webpack(config, { isServer }) {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8887 : 8886,  // Changer les ports ici
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
