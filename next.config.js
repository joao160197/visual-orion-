/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Adiciona suporte ao domínio do Strapi a partir da variável de ambiente
      ...(process.env.NEXT_PUBLIC_STRAPI_URL ? [{
        protocol: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).protocol.replace(':', ''),
        hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname,
        port: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).port || '',
        pathname: '/uploads/**',
      }] : [])
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
