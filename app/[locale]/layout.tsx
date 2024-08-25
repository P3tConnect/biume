import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { cn } from "@/src/lib/utils";
import { safeConfig } from "@/src/lib";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";
import Providers from "@/src/context/providers";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const nunito = Nunito({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"] });

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations("Metadata");
    return {
        title: "PawThera",
        metadataBase: new URL(`${safeConfig.NEXT_PUBLIC_APP_URL}`),
        description: t("description"),
        icons: {
            icon: "/app/favicon.ico",
        },
        appleWebApp: {
            title: "PawThera",
        },
        openGraph: {
            type: "website",
            locale: params.locale,
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
            t('keywords.keyword1'),
            t('keywords.keyword2'),
            t('keywords.keyword3'),
            t('keywords.keyword4'),
            t('keywords.keyword5'),
            t('keywords.keyword6'),
            t('keywords.keyword7'),
            t('keywords.keyword8'),
            t('keywords.keyword9'),
            t('keywords.keyword10'),
            t('keywords.keyword11'),
            t('keywords.keyword12'),
            t('keywords.keyword13'),
            t('keywords.keyword14'),
            t('keywords.keyword15'),
            t('keywords.keyword16'),
            t('keywords.keyword17'),
        ],
    }
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string }
}>) {
    const messages = await getMessages({ locale: params.locale });

    return (
        <html lang={params.locale}>
            <head>
                <script
                    defer
                    src="https://woyage.app/track.js"
                    data-website-id="b1932f9a-8d7c-4ebc-8c7b-fec2877848bc"
                ></script>
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    nunito.className,
                )}
            >
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <NextSSRPlugin
                            routerConfig={extractRouterConfig(ourFileRouter)}
                        />
                        <div vaul-drawer-wrapper="" className="bg-background">
                            {children}
                        </div>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
