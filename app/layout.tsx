import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/src/lib/utils";
import { ThemeProvider } from "@/src/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawThera",
  description: "The PawThera App",
  icons: {
    icon: "/app/favicon.ico"
  },
  robots: {
    follow: true,
    index: true,
  },
  keywords: [
    "osteopathe animalier",
    "animaux",
    "animaux de companie",
    "naturopathe animalier",
    "nac",
    "comportementaliste animalier",
    "chien",
    "chat",
    "cheval"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
