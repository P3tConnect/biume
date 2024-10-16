// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const i18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "fr",
});

const protectedRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect();

  return i18nMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
