import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default function configure(config, { isServer }) {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: isServer ? 8889 : 8890,  // Changez les ports ici
      openAnalyzer: true,
    })
  );
  return config;
}
