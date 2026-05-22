/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'midnightmuseclub.shop',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
    qualities: [60, 75, 80, 90, 100], 
  },
}



export default nextConfig