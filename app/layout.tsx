import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/src/context/providers";
import { cn } from "@/src/lib/utils";
import { safeConfig } from "@/src/lib";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { GeistSans } from "geist/font/sans";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NuqsAdapter } from "nuqs/adapters/next";
const geist = GeistSans;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale: locale, namespace: "metadata" });
  return {
    title: "PawThera",
    metadataBase: new URL(`${safeConfig.NEXT_PUBLIC_APP_URL}`),
    description: t("description"),
    icons: {
      icon: `${safeConfig.NEXT_PUBLIC_APP_URL}/assets/images/Icone.png`,
    },
    appleWebApp: {
      title: "PawThera",
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: "https://pawthera.com",
      description: t("description"),
      siteName: "PawThera",
      images: [
        {
          url: `${safeConfig.NEXT_PUBLIC_APP_URL}/PawThera.jpeg`,
          width: 1200,
          height: 630,
          alt: "PawThera",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "PawThera",
      description: t("description"),
      images: [`${safeConfig.NEXT_PUBLIC_APP_URL}/PawThera.jpeg`],
    },
    applicationName: "PawThera",
    authors: [
      {
        name: "Mathieu Chambaud",
        url: "https://www.linkedin.com/in/mathieu-chambaud-9b4106170/",
      },
      {
        name: "Graig Kolodziejczyk",
        url: "https://www.linkedin.com/in/graig-kolodziejczyk-1482241b8/",
      },
    ],
    robots: {
      follow: true,
      index: true,
    },
    keywords: [
      t("keywords.keyword1"),
      t("keywords.keyword2"),
      t("keywords.keyword3"),
      t("keywords.keyword4"),
      t("keywords.keyword5"),
      t("keywords.keyword6"),
      t("keywords.keyword7"),
      t("keywords.keyword8"),
      t("keywords.keyword9"),
      t("keywords.keyword10"),
      t("keywords.keyword11"),
      t("keywords.keyword12"),
      t("keywords.keyword13"),
      t("keywords.keyword14"),
      t("keywords.keyword15"),
      t("keywords.keyword16"),
      t("keywords.keyword17"),
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages({ locale: locale });
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={cn("min-h-screen font-sans antialiased", geist.className)}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SidebarProvider defaultOpen={defaultOpen}>
              <div vaul-drawer-wrapper="">
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <NuqsAdapter>{children}</NuqsAdapter>
              </div>
              <TailwindIndicator />
            </SidebarProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
