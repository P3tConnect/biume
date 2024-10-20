// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const i18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "fr",
});

const protectedRoutes = createRouteMatcher([
  "/(.*)/dashboard(.*)",
  "/(.*)/onboarding(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/(.*)/onboarding(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = auth();

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
  ],
};
