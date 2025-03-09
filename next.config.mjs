import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
        protocol: "https",
      },
      {
        hostname: "cdn.magicui.design",
        protocol: "https",
      },
      {
        hostname: 'randomuser.me',
        protocol: 'https',
      },
      {
        hostname: 'images.unsplash.com',
        protocol: "https",
      },
      {
        hostname: 'sea1.ingest.uploadthing.com',
        protocol: 'https',
      },
      {
        hostname: 'utfs.io',
        protocol: 'https',
      }
    ],
  },
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
    TRIGGER_PUBLIC_API_KEY: process.env.TRIGGER_PUBLIC_API_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    STRIPE_BASIC_PLAN_MONTHLY_ID: process.env.STRIPE_BASIC_PLAN_MONTHLY_ID,
    STRIPE_BASIC_PLAN_YEARLY_ID: process.env.STRIPE_BASIC_PLAN_YEARLY_ID,
    STRIPE_PRO_PLAN_MONTHLY_ID: process.env.STRIPE_PRO_PLAN_MONTHLY_ID,
    STRIPE_PRO_PLAN_YEARLY_ID: process.env.STRIPE_PRO_PLAN_YEARLY_ID,
    STRIPE_ULTIMATE_PLAN_MONTHLY_ID: process.env.STRIPE_ULTIMATE_PLAN_MONTHLY_ID,
    STRIPE_ULTIMATE_PLAN_YEARLY_ID: process.env.STRIPE_ULTIMATE_PLAN_YEARLY_ID,
    STRIPE_WEBHOOK_BASIC_SECRET: process.env.STRIPE_WEBHOOK_BASIC_SECRET,
    STRIPE_WEBHOOK_PRO_SECRET: process.env.STRIPE_WEBHOOK_PRO_SECRET,
    STRIPE_WEBHOOK_ULTIMATE_SECRET: process.env.STRIPE_WEBHOOK_ULTIMATE_SECRET,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
