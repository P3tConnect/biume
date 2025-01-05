import { createAuthClient } from "better-auth/react";
import {
  organizationClient,
  twoFactorClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { ac, member, admin, owner } from "./auth";

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
