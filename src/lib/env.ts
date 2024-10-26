import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DATABASE_URL: string | undefined;
  RESEND_API_KEY: string | undefined;
  TRIGGER_PUBLIC_API_KEY: string | undefined;
  TRIGGER_SECRET_KEY: string | undefined;
  NEXT_PUBLIC_APP_URL: string | undefined;
  NODE_ENV: string | undefined;
  NEXT_PUBLIC_POSTHOG_KEY: string | undefined;
  NEXT_PUBLIC_POSTHOG_HOST: string | undefined;
  STRIPE_SECRET_KEY: string | undefined;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string | undefined;
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string | undefined;
  CLERK_SECRET_KEY: string | undefined;
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: string | undefined;
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: string | undefined;
}

interface Config {
  DATABASE_URL: string;
  RESEND_API_KEY: string;
  TRIGGER_PUBLIC_API_KEY: string;
  TRIGGER_SECRET_KEY: string;
  NEXT_PUBLIC_APP_URL: string;
  NODE_ENV: string;
  NEXT_PUBLIC_POSTHOG_KEY: string;
  NEXT_PUBLIC_POSTHOG_HOST: string;
  STRIPE_SECRET_KEY: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  CLERK_SECRET_KEY: string;
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: string;
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: string;
}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TRIGGER_PUBLIC_API_KEY: process.env.TRIGGER_PUBLIC_API_KEY,
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
  };
};

const getSafeConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

export const safeConfig = getSafeConfig(config);
