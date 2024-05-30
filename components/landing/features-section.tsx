"use client"

import { cn } from "@/src/lib/utils";
import React, { useRef } from "react";
import { AnimatedBeam } from "../magicui/animated-beam";
import { BellIcon, BrainCircuit, CalendarIcon, GlobeIcon, ReceiptEuro, ScrollText } from 'lucide-react'
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

export default function FeaturesSection() {

  const features = [
    {
      Icon: BrainCircuit,
      name: "IA",
      description: "Nous voguons nous aussi sur la vague de l'IA",
      href: "/",
      cta: "En savoir plus",
      points: [

      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: ScrollText,
      name: "Administration et Comptabilité",
      description: "La gestion de votre entreprise n'a jamais été aussi simple !",
      href: "/",
      cta: "En savoir plus",
      points: [

      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: ReceiptEuro,
      name: "Réservation en ligne",
      description: "Attirez de nouveaux clients !",
      href: "/",
      cta: "En savoir plus",
      points: [

      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: "Calendrier",
      description: "Gérer votre calendrier comme jamais.",
      href: "/",
      cta: "En savoir plus",
      points: [

      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Notifications & Rappels",
      description:
        "Notifiez vos utilisateurs pour qu'ils ne manquent plus leurs rendez-vous",
      href: "/",
      cta: "En savoir plus",
      points: [

      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <section id="features">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Notre application
          </h4>

          <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Les fonctionnalités
          </h2>
        </div>

        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}