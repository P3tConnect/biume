import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/src/context/providers";
import { cn } from "@/src/lib/utils";
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
import { safeConfig } from "@/src/lib/env";
import NextTopLoader from "nextjs-toploader";
const geist = GeistSans;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const t = await getTranslations({ namespace: "metadata" });

  return {
    title: "Biume",
    metadataBase: new URL(`${safeConfig.NEXT_PUBLIC_APP_URL}`),
    description: t("description"),
    icons: {
      icon: `${process.env.NEXT_PUBLIC_VERCEL_URL}/assets/images/biume-logo.png`,
    },
    appleWebApp: {
      title: "Biume",
      startupImage: {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/assets/images/biume-logo.png`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: "https://biume.com",
      description: t("description"),
      siteName: "Biume",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/assets/images/biume-logo.png`,
          width: 1200,
          height: 630,
          alt: "Biume",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Biume",
      description: t("description"),
      images: [
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/assets/images/biume-logo.png`,
      ],
    },
    applicationName: "Biume",
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
      follow: false,
      index: false,
      googleBot: {
        index: false,
        follow: false,
      },
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
      t("keywords.keyword18"),
      t("keywords.keyword19"),
      t("keywords.keyword20"),
      t("keywords.keyword21"),
      t("keywords.keyword22"),
      t("keywords.keyword23"),
      t("keywords.keyword24"),
      t("keywords.keyword25"),
      t("keywords.keyword26"),
      t("keywords.keyword27"),
      t("keywords.keyword28"),
      t("keywords.keyword29"),
      t("keywords.keyword30"),
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
                <NuqsAdapter>
                  <NextTopLoader
                    height={3}
                    color="#A594FF"
                    showSpinner={false}
                  />
                  {children}
                </NuqsAdapter>
              </div>
              <TailwindIndicator />
            </SidebarProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
