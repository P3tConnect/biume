import { ac, admin, member, owner } from "./auth";
import {
  inferAdditionalFields,
  organizationClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";

import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  verifyEmail,
  getSession,
  sendVerificationEmail,
  linkSocial,
  deleteUser,
  updateUser,
  forgetPassword,
  useActiveMember,
  twoFactor,
  organization,
  useActiveOrganization,
  useListOrganizations,
} = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    usernameClient(),
    organizationClient({
      ac: ac,
      roles: {
        member,
        admin,
        owner,
      },
    }),
    twoFactorClient(),
    inferAdditionalFields({
      user: {
        stripeId: {
          type: "string",
          defaultValue: "",
        },
        isPro: {
          type: "boolean",
          defaultValue: false,
          required: false,
        },
        onBoardingComplete: {
          type: "boolean",
          defaultValue: false,
          required: false,
        },
        address: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        zipCode: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        country: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        city: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        phoneNumber: {
          type: "string",
          defaultValue: "",
          required: false,
        },
        smsNotifications: {
          type: "boolean",
          defaultValue: false,
          required: false,
        },
        emailNotifications: {
          type: "boolean",
          defaultValue: false,
          required: false,
        },
      },
    }),
  ],
});
