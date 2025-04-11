import ClientHome from "@/components/landing-page/client-home"
import { Suspense } from "react"
import HomePageLoading from "./loading"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Biume - Accueil",
  description: "Accueil de Biume",
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Biume - Accueil",
    description: "Accueil de Biume",
    url: "https://biume.fr",
    siteName: "Biume",
  },
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageLoading />}>
      <ClientHome />
    </Suspense>
  )
}
