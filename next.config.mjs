/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.PUBLIC_BASE_PATH ?? ''
};

console.log("BASE PATH " + process.env.PUBLIC_BASE_PATH)
export default nextConfig;
