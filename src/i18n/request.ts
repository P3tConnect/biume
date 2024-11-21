import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const localCookie = await cookies();
  const locale = localCookie.get("NEXT_LOCALE")?.value ?? routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../public/messages/${locale}.json`)).default,
  };
});
