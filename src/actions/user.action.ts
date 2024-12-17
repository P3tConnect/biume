import { action, registerSchema } from "../lib";
import { APIError } from "better-auth/api";
import { auth } from "../lib/auth";

export const signUp = action.input(registerSchema).handler(async ({ input }) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name: input.name,
                email: input.email,
                password: input.password,
                stripeId: "",
                image: "",
                onBoardingComplete: false,
            },
            asResponse: true,
        })
    } catch (err) {
        if (err instanceof APIError) {
            return err
        }
        console.log(err);
    }
});