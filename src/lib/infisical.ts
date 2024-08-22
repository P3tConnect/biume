import { InfisicalClient } from "@infisical/sdk";
import { safeConfig } from "./env";

const infisicalClientVariables = {
  TRIGGER_SECRET_KEY: "TRIGGER_SECRET_KEY",
  TRIGGER_PUBLIC_API_KEY: "TRIGGER_PUBLIC_API_KEY",
  RESEND_API_KEY: "RESEND_API_KEY",
  UPLOADTHING_APP_ID: "UPLOADTHING_APP_ID",
  UPLOADTHING_SECRET: "UPLOADTHING_SECRET",
  DATABASE_URL: "DATABASE_URL",
};

export const environment = safeConfig.NODE_ENV;

export const infisicalClient = new InfisicalClient({
  auth: {
    universalAuth: {
      clientId: safeConfig.INFISICAL_CLIENT_ID,
      clientSecret: safeConfig.INFISICAL_CLIENT_SECRET,
    },
  },
});

export const getTriggerPublicApiKey = async () => {
  const secret = await infisicalClient.getSecret({
    environment: environment,
    projectId: safeConfig.INFISICAL_PROJECT_ID,
    secretName: infisicalClientVariables.TRIGGER_PUBLIC_API_KEY,
  });

  return secret;
};

export const getTriggerSecret = async () => {
  const secret = await infisicalClient.getSecret({
    environment: environment,
    projectId: safeConfig.INFISICAL_PROJECT_ID,
    secretName: infisicalClientVariables.TRIGGER_SECRET_KEY,
  });

  return secret;
};

export const getResendApiKey = async () => {
  const secret = await infisicalClient.getSecret({
    environment: environment,
    projectId: safeConfig.INFISICAL_PROJECT_ID,
    secretName: infisicalClientVariables.RESEND_API_KEY,
  });

  return secret;
};

export const getUploadthingAppId = async () => {
  const secret = await infisicalClient.getSecret({
    environment: environment,
    projectId: safeConfig.INFISICAL_PROJECT_ID,
    secretName: infisicalClientVariables.UPLOADTHING_APP_ID,
  });

  return secret;
};

export const getUploadthingSecret = async () => {
  const secret = await infisicalClient.getSecret({
    environment: environment,
    projectId: safeConfig.INFISICAL_PROJECT_ID,
    secretName: infisicalClientVariables.UPLOADTHING_SECRET,
  });

  return secret;
};

export const getDatabaseUrl = async () => {
  const secret = await infisicalClient.getSecret({
    environment: environment,
    projectId: safeConfig.INFISICAL_PROJECT_ID,
    secretName: infisicalClientVariables.DATABASE_URL,
  });

  return secret;
};
