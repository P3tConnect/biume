import { DefaultSession, User as AdapterUser } from "next-auth";
import "next-auth/jwt";
import { Job, Plan } from "./src/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            emailVerified: Date | null;
            stripeId: string | null;
            isPro: boolean | null;
            plan: Plan;
            role: Job[];
        };
    }

    interface User extends AdapterUser {
        emailVerified: Date | null;
        stripeId: string | null;
        isPro: boolean | null;
        plan: Plan;
        role: Job[];
    }
}
