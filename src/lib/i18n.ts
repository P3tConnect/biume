import { getRequestConfig } from "next-intl/server";
import { locales } from "./types";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`../../public/messages/${locale}.json`)).default,
  };
});
