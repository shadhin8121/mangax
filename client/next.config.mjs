/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Allowing images from any domain
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // This allows all hostnames
                port: "", // No specific port
                pathname: "/**", // This allows all paths
            },
            {
                protocol: "http",
                hostname: "**", // This allows all hostnames
                port: "", // No specific port
                pathname: "/**", // This allows all paths
            },
        ],
    },
};

export default nextConfig;
