"use client"

import React from "react";
import { BellIcon, BrainCircuit, CalendarIcon, ReceiptEuro, ScrollText } from 'lucide-react'
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
        "Nous proposerons une intégration avec l'organisation de votre journée en fonction du chemin le plus court ou le plus efficace à parcourir pour vous",
        "L'IA proposera également aux les créneaux adéquates en fonction de la position des clients qui ont déjà réservés",
        "Nous souhaitons également vous proposer une fonctionnalité de Speach-To-Text sur notre future application mobile qui vous permettras de vous concentrer sur la séance avec l'animal",
        "Grâce a la reconnaissance d'images vous pourrez scanner et enregistrer les reçus de vos achats pour votre entreprise",
        "Une fois enregistrés ces reçus seront catégorisés de manière automatique grâce à l'intelligence artificielle",
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
        "Un tableau de bord interactif que vous pouvez remodeler à votre image",
        "Une gestion des dépenses et des revenus centralisé",
        "Un suivi des paiements détaillé pour plus de clartée",
        "Une facturation et devis personnalisable et qui peuvent être envoyés directement à votre client de manière automatique après sa prise de rendez-vous",
        "Créez et éditez des fiches clients/patients à volonté"
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
        "Vos clients pourrons voir en temps réel les créneaux disponibles",
        "Vous aurez la liberté de planifier des délais de retractation pour vous permettre de vous garantir un revenu quand à l'annulation au dernier moment de votre client",
        "Si une consultation demandée est a domicile les frais de déplacements seront apportés directement dans la facturation",
        ""
      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: "Calendrier",
      description: "Contrôlez votre calendrier à la baguette !",
      href: "/",
      cta: "En savoir plus",
      points: [
        "Vous pourrez gérer votre agenda comme vous l'entendez",
        "Une synchronisation automatique avec votre agenda favori (Apple Calendar, Google Calendar, ...)"
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
        "Vous pourrez envoyer des mails, notifications ou sms à vos clients pour plus qu'ils ne manquent leur rendez-vous",
        "Une gestion automatique des rappels et de ces notifications avec un système de planification",
      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <section id="features">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-32 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Notre application
          </h4>

          <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Les fonctionnalités
          </h2>

          <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
            Ce sont les fonctionnalités que nous avons prévus, aidez-nous à l&apos;améliorer pour en faire <strong>votre outil !</strong>
          </p>
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