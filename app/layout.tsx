import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/src/context/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PawThera",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
    description:
        "PawThera, l'application qui fait gagner du temps aux auto-entrepreneur du secteur animalier",
    icons: {
        icon: "/app/favicon.ico",
    },
    appleWebApp: {
        title: "PawThera",
    },
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://pawthera.com",
        description:
            "PawThera, l'application qui fait gagner du temps aux auto-entrepreneur du secteur animalier",
        siteName: "PawThera",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/PawThera.jpeg`,
                width: 1200,
                height: 630,
                alt: "PawThera",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "PawThera",
        description:
            "PawThera, l'application qui fait gagner du temps aux auto-entrepreneur du secteur animalier",
        images: [`${process.env.NEXT_PUBLIC_APP_URL}/PawThera.jpeg`],
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
        "osteopathe animalier",
        "animaux",
        "animal",
        "animaux de companie",
        "naturopathe animalier",
        "nac",
        "comportementaliste animalier",
        "chien",
        "chat",
        "cheval",
        "pawthera",
        "pawtera",
        "pwthera",
        "indépendant",
        "indépendant animalier",
        "auto-entreprise animale",
        "gestion",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
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
                    inter.className,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                >
                    <div vaul-drawer-wrapper="" className="bg-background">
                        {children}
                    </div>
                </ThemeProvider>
                <SpeedInsights />
                <Analytics />
                <Toaster />
            </body>
        </html>
    );
}
