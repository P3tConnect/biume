"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/src/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useState } from "react";

type Interval = "mois" | "an";

export const toHumanPrice = (price: number, decimals: number = 2) => {
  return Number(price / 100)
};
const demoPrices = [
  {
    id: "price_1",
    name: "Basic",
    description: "L'essentiel pour gérer votre auto-entreprise",
    features: [
      "Gestion client",
      "Facturation et Devis",
      "Gestion emploi du temps",
      "Comptes rendus et observations",
      "Comptabilité",
      "Synchro automatique de l'agenda",
      "Partage de dossier client entre professionnels"
    ],
    monthlyPrice: 999,
    yearlyPrice: 11900,
    isMostPopular: false,
  },
  {
    id: "price_2",
    name: "Premium",
    description: "Le stade supérieur pour la sécurité et faire grandir votre entreprise",
    features: [
      "Abonnement Basic +",
      "Réservation client",
      "Paiement en ligne",
      "notifications et rappels automatiques",
      "Délais de rétractation",
      "Echelons de remboursement personnalisés"
    ],
    monthlyPrice: 1499,
    yearlyPrice: 17988,
    isMostPopular: true,
  },
  {
    id: "price_6",
    name: "Ultimate",
    description: "Le plan ultime pour ceux qui veulent gagner encore plus de temps",
    features: [
      "Abonnement Premium +",
      "Fonctionnalités avec Intelligence Artificielle",
      "Rapports de performances",
      "Communication centralisée"
    ],
    monthlyPrice: 2499,
    yearlyPrice: 29988,
    isMostPopular: false,
  },
];

export default function PricingSection() {
  const [interval, setInterval] = useState<Interval>("mois");

  return (
    <section id="pricing">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Prix
          </h4>

          <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Nos abonnements.
          </h2>

          <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
            Choisissez le plan <strong>qui vous convient</strong> pour profiter au maximum des fonctionnalités de la plateforme.
          </p>
        </div>

        <div className="flex w-full items-center justify-center space-x-2">
          <Switch
            id="interval"
            onCheckedChange={(checked) => {
              setInterval(checked ? "an" : "mois");
            }}
          />
          <span>Annuel</span>
          <span className="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black">
            1 MOIS D&apos;ESSAI GRATUIT ✨
          </span>
        </div>

        <div className="mx-auto grid w-full justify-center sm:grid-cols-2 lg:grid-cols-3 flex-col gap-4">
          {demoPrices.map((price, idx) => (
            <div
              key={price.id}
              className={cn(
                "relative flex max-w-[400px] flex-col gap-8 rounded-2xl border p-4 text-black dark:text-white overflow-hidden",
                {
                  "border-2 border-[var(--color-one)] dark:border-[var(--color-one)]":
                    price.isMostPopular,
                }
              )}
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <h2 className="text-base font-semibold leading-7">
                    {price.name}
                  </h2>
                  <p className="h-12 text-sm leading-5 text-black/70 dark:text-white">
                    {price.description}
                  </p>
                </div>
              </div>

              <motion.div
                key={`${price.id}-${interval}`}
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0,
                    y: 12,
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex flex-row gap-1"
              >
                <span className="text-4xl font-bold text-black dark:text-white">
                  {interval === "an"
                    ? toHumanPrice(price.yearlyPrice, 0)
                    : toHumanPrice(price.monthlyPrice, 0)}€
                  <span className="text-xs"> / {interval}</span>
                </span>
              </motion.div>

              <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />
              {price.features && price.features.length > 0 && (
                <ul className="flex flex-col gap-2 font-normal">
                  {price.features.map((feature: any, idx: any) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-xs font-medium text-black dark:text-white"
                    >
                      <CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white" />
                      <span className="flex">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
