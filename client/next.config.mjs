/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',       // Specify the protocol
                hostname: 'localhost',  // Only the hostname without port
                port: '4043',           // Include the port if needed
                pathname: '/cover_image/**', // Define the path pattern
            },
        ],
    },
};

export default nextConfig;
