import { DefaultSession, User as AdapterUser } from "next-auth";
import "next-auth/jwt";
import { type Role, Plan } from "./src/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      stripeId: string | null;
      address: string | null;
      isPro: boolean | null;
      plan: Plan;
      role: Role;
    };
  }

  interface User extends AdapterUser {
    user: AdapterUser & {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      stripeId: string | null;
      address: string | null;
      isPro: boolean | null;
      plan: Plan;
      role: Role;
    };
  }
}
