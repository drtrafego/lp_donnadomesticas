/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/mar2601',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
