import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Fonts - CacheFirst (1 year)
    {
      urlPattern: /\/fonts\/.*\.(woff2?|ttf)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 31536000,
        },
      },
    },
    // Static assets - CacheFirst (1 year, hashed names)
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 31536000,
        },
      },
    },
    // Images - StaleWhileRevalidate (30 days)
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 2592000,
        },
      },
    },
    // External images - StaleWhileRevalidate (7 days)
    {
      urlPattern: /^https?:\/\/.*\.(?:jpg|jpeg|gif|png|svg|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'external-images-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 604800,
        },
      },
    },
    // Auth API - NetworkOnly (never cache)
    {
      urlPattern: /\/api\/auth\/.*/i,
      handler: 'NetworkOnly',
    },
    // Add API - NetworkOnly (mutation)
    {
      urlPattern: /\/api\/add/i,
      handler: 'NetworkOnly',
    },
    // Share pages (public) - NetworkFirst (1 hour)
    {
      urlPattern: /\/share\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'share-pages-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 3600,
        },
        networkTimeoutSeconds: 10,
      },
    },
    // Folder pages (auth) - NetworkFirst (5 min)
    {
      urlPattern: /\/folder\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'folder-pages-cache',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 300,
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withPWA(nextConfig);
