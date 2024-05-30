import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    ""
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
