import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawThera",
  description: "The PawThera App",
  robots: {
    follow: true,
    index: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/app/favicon.ico"
          type="image/icon"
          sizes="any"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
