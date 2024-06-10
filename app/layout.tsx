import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from "@/src/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawThera",
  description: "PawThera, l'application qui fait gagner du temps aux auto-entrepreneur du secteur animalier",
  icons: {
    icon: "/app/favicon.ico"
  },
  appleWebApp: {
    title: 'PawThera',
  },
  applicationName: "PawThera",
  authors: [
    {
      name: "Mathieu Chambaud",
      url: "https://www.linkedin.com/in/mathieu-chambaud-9b4106170/"
    },
    {
      name: "Graig Kolodziejczyk",
      url: "https://www.linkedin.com/in/graig-kolodziejczyk-1482241b8/"
    }
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
        <script defer src="https://woyage.app/track.js" data-website-id="c5d0f8b4-19fe-4359-a525-4268ac2d4ef0"></script>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
