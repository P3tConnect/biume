"use client";

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import Link from "next/link";

const CGUPage = () => {
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
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
          </motion.div>
          <span className="font-bold tracking-tight text-xl">Biume</span>
        </Link>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Conditions Générales d&apos;Utilisation
          </h1>

          <div className="space-y-8 text-foreground/90">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Introduction
              </h2>
              <p>
                Bienvenue sur Biume. Les présentes Conditions Générales
                d&apos;Utilisation régissent votre utilisation de notre
                application et des services associés. En accédant à notre
                plateforme ou en l&apos;utilisant, vous acceptez d&apos;être lié
                par ces conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Définitions
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service</strong> : l&apos;application Biume et toutes
                  ses fonctionnalités
                </li>
                <li>
                  <strong>Utilisateur</strong> : toute personne qui accède ou
                  utilise le Service
                </li>
                <li>
                  <strong>Compte</strong> : l&apos;espace personnel créé lors de
                  l&apos;inscription
                </li>
                <li>
                  <strong>Contenu</strong> : données, textes, images et autres
                  éléments partagés via le Service
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Inscription et compte
              </h2>
              <p>
                Pour utiliser certaines fonctionnalités de notre Service, vous
                devez créer un compte. Vous êtes responsable du maintien de la
                confidentialité de vos informations de connexion et de toutes
                les activités qui se produisent sous votre compte.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Utilisation du service
              </h2>
              <p>
                Vous vous engagez à utiliser notre Service conformément aux
                présentes conditions et à toutes les lois applicables. Vous ne
                devez pas :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Utiliser le Service d&apos;une manière qui pourrait
                  l&apos;endommager
                </li>
                <li>
                  Tenter d&apos;accéder à des parties du Service auxquelles vous
                  n&apos;êtes pas autorisé
                </li>
                <li>
                  Utiliser le Service pour distribuer des contenus illégaux ou
                  nuisibles
                </li>
                <li>
                  Collecter des informations sur d&apos;autres utilisateurs sans
                  autorisation
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Propriété intellectuelle
              </h2>
              <p>
                Le Service et son contenu original, fonctionnalités et
                fonctionnalités sont la propriété de Biume et sont protégés par
                les lois internationales sur le droit d&apos;auteur et la
                propriété intellectuelle.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Modifications des conditions
              </h2>
              <p>
                Nous nous réservons le droit de modifier ces conditions à tout
                moment. Les modifications entrent en vigueur dès leur
                publication sur cette page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Contact
              </h2>
              <p>
                Si vous avez des questions concernant ces conditions, veuillez
                nous contacter à l&apos;adresse suivante :{" "}
                <a href="mailto:contact@biume.com" className="text-primary">
                  contact@biume.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Biume. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-foreground/60 hover:text-foreground"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/contact"
              className="text-sm text-foreground/60 hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CGUPage;
