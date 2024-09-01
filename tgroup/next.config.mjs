// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4043',
                pathname: '/cover_image/**',
            },
        ],
    },
};

export default nextConfig;
