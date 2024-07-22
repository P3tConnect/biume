import dotenv from "dotenv";

dotenv.config();

interface ENV {
  RESEND_API_KEY: string | undefined;
  DATABASE_URL: string | undefined;
  UPLOADTHING_APP_ID: string | undefined;
  UPLOADTHING_SECRET: string | undefined;
  NEXT_PUBLIC_APP_URL: string | undefined;
  TRIGGER_PUBLIC_API_KEY: string | undefined;
  TRIGGER_SECRET_KEY: string | undefined;
}

interface Config {
  RESEND_API_KEY: string;
  DATABASE_URL: string;
  UPLOADTHING_APP_ID: string;
  UPLOADTHING_SECRET: string;
  NEXT_PUBLIC_APP_URL: string;
  TRIGGER_PUBLIC_API_KEY: string;
  TRIGGER_SECRET_KEY: string;
}

const getConfig = (): ENV => {
  return {
    RESEND_API_KEY: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    TRIGGER_PUBLIC_API_KEY: process.env.TRIGGER_PUBLIC_API_KEY,
    TRIGGER_SECRET_KEY: process.env.TRIGGER_SECRET_KEY,
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
