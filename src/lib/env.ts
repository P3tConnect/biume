import dotenv from "dotenv"

dotenv.config()

interface ENV {
  DATABASE_URL: string | undefined
  RESEND_API_KEY: string | undefined
  TRIGGER_PUBLIC_API_KEY: string | undefined
  TRIGGER_SECRET_KEY: string | undefined
  NEXT_PUBLIC_APP_URL: string | undefined
  NODE_ENV: string | undefined
  NEXT_PUBLIC_POSTHOG_KEY: string | undefined
  NEXT_PUBLIC_POSTHOG_HOST: string | undefined
  STRIPE_SECRET_KEY: string | undefined
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string | undefined
  BETTER_AUTH_SECRET: string | undefined
  BETTER_AUTH_URL: string | undefined
  UPLOADTHING_TOKEN: string | undefined
  STRIPE_BASIC_PLAN_MONTHLY_ID: string | undefined
  STRIPE_BASIC_PLAN_YEARLY_ID: string | undefined
  STRIPE_PRO_PLAN_MONTHLY_ID: string | undefined
  STRIPE_PRO_PLAN_YEARLY_ID: string | undefined
  STRIPE_ULTIMATE_PLAN_MONTHLY_ID: string | undefined
  STRIPE_ULTIMATE_PLAN_YEARLY_ID: string | undefined
  STRIPE_WEBHOOK_BASIC_SECRET: string | undefined
  STRIPE_WEBHOOK_PRO_SECRET: string | undefined
  STRIPE_WEBHOOK_ULTIMATE_SECRET: string | undefined
  STRIPE_WEBHOOK_TRANSACTION_SECRET: string | undefined
}

interface Config {
  DATABASE_URL: string
  RESEND_API_KEY: string
  TRIGGER_PUBLIC_API_KEY: string
  TRIGGER_SECRET_KEY: string
  NEXT_PUBLIC_APP_URL: string
  NODE_ENV: string
  NEXT_PUBLIC_POSTHOG_KEY: string
  NEXT_PUBLIC_POSTHOG_HOST: string
  STRIPE_SECRET_KEY: string
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
  UPLOADTHING_TOKEN: string
  STRIPE_BASIC_PLAN_MONTHLY_ID: string
  STRIPE_BASIC_PLAN_YEARLY_ID: string
  STRIPE_PRO_PLAN_MONTHLY_ID: string
  STRIPE_PRO_PLAN_YEARLY_ID: string
  STRIPE_ULTIMATE_PLAN_MONTHLY_ID: string
  STRIPE_ULTIMATE_PLAN_YEARLY_ID: string
  STRIPE_WEBHOOK_BASIC_SECRET: string
  STRIPE_WEBHOOK_PRO_SECRET: string
  STRIPE_WEBHOOK_ULTIMATE_SECRET: string
  STRIPE_WEBHOOK_TRANSACTION_SECRET: string
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
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    STRIPE_WEBHOOK_TRANSACTION_SECRET: process.env.STRIPE_WEBHOOK_TRANSACTION_SECRET,
  }
}

const getSafeConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`)
    }
  }
  return config as Config
}

const config = getConfig()

export const safeConfig = getSafeConfig(config)
