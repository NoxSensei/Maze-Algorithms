/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.PUBLIC_BASE_PATH ?? '',
    assetPrefix: process.env.PUBLIC_BASE_PATH ?? ''
};

export default nextConfig;
