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
        phoneNumber: {
          type: "string",
          required: false,
          defaultValue: "",
        },
        address: {
          type: "string",
          required: false,
          defaultValue: "",
        },
        city: {
          type: "string",
          required: false,
          defaultValue: "",
        },
        zipCode: {
          type: "string",
          required: false,
          defaultValue: "",
        },
        country: {
          type: "string",
          required: false,
          defaultValue: "",
        },
        birthday: {
          type: "date",
          required: false,
          defaultValue: new Date().toISOString().split("T")[0],
        },
        smsNotification: {
          type: "boolean",
          required: false,
          defaultValue: false,
        },
        emailNotification: {
          type: "boolean",
          required: false,
          defaultValue: false,
        },
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
      },
    }),
  ],
});