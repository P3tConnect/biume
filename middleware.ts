import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr", "en"],

  // Used when no locale matches
  defaultLocale: "fr",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en)/:path*"],
};
