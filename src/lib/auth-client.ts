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
          required: true,
        },
        onBoardingComplete: {
          type: "boolean",
          defaultValue: false,
          required: true,
        },
      },
    }),
  ],
});
