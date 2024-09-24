import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DATABASE_URL: string | undefined;
  DATABASE_HOST: string | undefined;
  DATABASE_NAME: string | undefined;
  DATABASE_USER: string | undefined;
  DATABASE_PASSWORD: string | undefined;
  RESEND_API_KEY: string | undefined;
  TRIGGER_PUBLIC_API_KEY: string | undefined;
  TRIGGER_SECRET_KEY: string | undefined;
  UPLOADTHING_APP_ID: string | undefined;
  UPLOADTHING_SECRET: string | undefined;
  NEXT_PUBLIC_APP_URL: string | undefined;
  AUTH_SECRET: string | undefined;
  NODE_ENV: string | undefined;
  GOOGLE_CLIENT_ID: string | undefined;
  GOOGLE_CLIENT_SECRET: string | undefined;
  FACEBOOK_CLIENT_ID: string | undefined;
  FACEBOOK_CLIENT_SECRET: string | undefined;
}

interface Config {
  DATABASE_URL: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  RESEND_API_KEY: string;
  TRIGGER_PUBLIC_API_KEY: string;
  TRIGGER_SECRET_KEY: string;
  UPLOADTHING_APP_ID: string;
  UPLOADTHING_SECRET: string;
  NEXT_PUBLIC_APP_URL: string;
  AUTH_SECRET: string;
  NODE_ENV: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  FACEBOOK_CLIENT_ID: string;
  FACEBOOK_CLIENT_SECRET: string;
}

const getConfig = (): ENV => {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TRIGGER_PUBLIC_API_KEY: process.env.TRIGGER_PUBLIC_API_KEY,
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_USER: process.env.DATABASE_USER,
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
