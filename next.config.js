const nextConfig = {
  reactStrictMode: false,
  compress: true,
  // swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 'cfahnvjnelirgcunlykx.supabase.co',
        pathname: '/storage/v1/object/public/uploads/avatars/**',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
