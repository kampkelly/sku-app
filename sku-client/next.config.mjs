/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sku',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
