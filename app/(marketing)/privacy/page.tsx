"use client"

import { motion } from "framer-motion"
import { PawPrint } from "lucide-react"
import Link from "next/link"

const PrivacyPage = () => {
  return (
    <div className="h-screen w-screen bg-background">
      {/* Fond décoratif avec effets de gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/20 to-transparent opacity-50 dark:opacity-30 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
          </motion.div>
          <span className="font-bold tracking-tight text-xl">Biume</span>
        </Link>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-8 text-foreground">Politique de confidentialité</h1>

          <div className="space-y-8 text-foreground/90">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
              <p>
                Chez Biume, nous accordons une grande importance à la protection de vos données personnelles. Cette
                politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations
                lorsque vous utilisez notre service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Collecte des données</h2>
              <p>
                Nous collectons les informations que vous nous fournissez directement lorsque vous créez un compte,
                utilisez notre application ou contactez notre service client. Ces informations peuvent inclure :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informations d&apos;identification (nom, prénom, adresse email)</li>
                <li>Données de profil</li>
                <li>Informations sur votre animal</li>
                <li>Données d&apos;utilisation et préférences</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Utilisation des données</h2>
              <p>Nous utilisons vos données personnelles pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir, maintenir et améliorer nos services</li>
                <li>Vous envoyer des notifications importantes concernant votre compte</li>
                <li>Vous proposer du contenu personnalisé</li>
                <li>Améliorer la sécurité de notre plateforme</li>
                <li>Répondre à vos demandes et questions</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Protection des données</h2>
              <p>
                La sécurité de vos données est notre priorité. Nous mettons en œuvre des mesures techniques et
                organisationnelles pour protéger vos informations contre tout accès non autorisé, modification,
                divulgation ou destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Partage des données</h2>
              <p>Nous ne partageons pas vos données personnelles avec des tiers, sauf dans les cas suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Avec votre consentement explicite</li>
                <li>Avec nos prestataires de service qui nous aident à fournir notre service</li>
                <li>Si nécessaire pour répondre à des obligations légales</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Vos droits</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez de droits
                concernant vos données personnelles, notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Le droit d&apos;accéder à vos données</li>
                <li>Le droit de rectifier vos données</li>
                <li>Le droit à l&apos;effacement (droit à l&apos;oubli)</li>
                <li>Le droit à la limitation du traitement</li>
                <li>Le droit à la portabilité des données</li>
                <li>Le droit d&apos;opposition</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
              <p>
                Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, analyser le
                trafic et personnaliser le contenu. Vous pouvez contrôler l&apos;utilisation des cookies via les
                paramètres de votre navigateur.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Modifications de la politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Les modifications
                prendront effet dès leur publication sur cette page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
              <p>
                Si vous avez des questions concernant cette politique de confidentialité, n&apos;hésitez pas à nous
                contacter à l&apos;adresse suivante :{" "}
                <a href="mailto:privacy@biume.com" className="text-primary hover:underline">
                  privacy@biume.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border/30 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">© {new Date().getFullYear()} Biume</span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Accueil
            </Link>
            <Link href="/cgu" className="text-foreground/70 hover:text-foreground transition-colors">
              CGU
            </Link>
            <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PrivacyPage
