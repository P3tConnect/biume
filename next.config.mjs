/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "i.imgur.com",
                protocol: "https",
            },
        ],
    },
    env: {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
        UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
        TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
        TRIGGER_PUBLIC_API_KEY: process.env.TRIGGER_PUBLIC_API_KEY,
    },
};

export default withNextIntl(nextConfig);
