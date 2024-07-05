import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async (params) => {
  const locale = params.locale;

  return {
    messages: await import(`../../public/messages/${locale}.json`),
  };
});
