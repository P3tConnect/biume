/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
        protocol: "https"
      }
    ],
  },
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  }
};

export default nextConfig;
