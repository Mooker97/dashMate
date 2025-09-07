import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Windows-specific optimizations
  experimental: {
    // Turbopack for faster development builds on Windows
    turbo: {
      resolveAlias: {
        // Prevent Windows path resolution issues
        '@': './src',
      },
    },
  },
  
  // Better webpack configuration for Windows
  webpack: (config, { dev, isServer }) => {
    // Fix for Windows file watching issues
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules', '**/.git', '**/.next'],
        // Use polling on Windows if needed
        poll: process.env.WEBPACK_POLL === 'true' ? 1000 : false,
      };
    }
    
    // Windows-friendly module resolution
    config.resolve.symlinks = false;
    
    return config;
  },
  
  // Output configuration
  output: 'standalone',
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
  },
  
  // TypeScript configuration
  typescript: {
    // Allow production builds to complete even with TypeScript errors
    // (useful during development on Windows)
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Allow production builds to complete even with ESLint errors during development
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
