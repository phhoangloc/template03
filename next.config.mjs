/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://be-mywatch.vercel.app'
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
        ],
    },

    env: {
        server_url: "https://be-mywatch.vercel.app/",
        google_url: "https://drive.google.com/uc?id="
    }
};

export default nextConfig;
