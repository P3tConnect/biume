import dotenv from "dotenv";

dotenv.config();

interface ENV {
  NEXT_PUBLIC_APP_URL: string | undefined;
  INFISICAL_CLIENT_ID: string | undefined;
  INFISICAL_CLIENT_SECRET: string | undefined;
  INFISICAL_PROJECT_ID: string | undefined;
  AUTH_SECRET: string | undefined;
  NODE_ENV: string | undefined;
}

interface Config {
  NEXT_PUBLIC_APP_URL: string;
  INFISICAL_CLIENT_ID: string;
  INFISICAL_CLIENT_SECRET: string;
  INFISICAL_PROJECT_ID: string;
  AUTH_SECRET: string;
  NODE_ENV: string;
}

const getConfig = (): ENV => {
  return {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    INFISICAL_CLIENT_ID: process.env.INFISICAL_CLIENT_ID,
    INFISICAL_CLIENT_SECRET: process.env.INFISICAL_CLIENT_SECRET,
    INFISICAL_PROJECT_ID: process.env.INFISICAL_PROJECT_ID,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
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
