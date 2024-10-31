// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const i18nMiddleware = createMiddleware(routing);

const protectedRoutes = createRouteMatcher([
  "/(.*)/dashboard(.*)",
  "/(.*)/onboarding(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/(.*)/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (protectedRoutes(req) && !userId) {
    redirectToSignIn({ returnBackUrl: req.nextUrl.pathname });
  }

  if (isOnboardingRoute(req) && sessionClaims?.metadata.onBoardingComplete) {
    const onboardingUrl = new URL("/(.*)/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  return i18nMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/(en|fr)/:path*",
  ],
};
