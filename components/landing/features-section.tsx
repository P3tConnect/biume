"use client";

import { BentoCard, BentoGrid } from "../magicui/bento-grid";

import Bell from "@/public/assets/svg/notification.svg";
import Calendar from "@/public/assets/svg/Calendrier.svg";
import Comptabilite from "@/public/assets/svg/Administration_et_comptabilite.svg";
import IA from "@/public/assets/svg/IA.svg";
import React from "react";
import ReceiptEuro from "@/public/assets/svg/Réservation_en_ligne.svg";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations("LandingPage");

  const features = [
    {
      Icon: Comptabilite,
      name: t("features.accounting.title"),
      description: t("features.accounting.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.accounting.points.point1"),
        t("features.accounting.points.point2"),
        t("features.accounting.points.point3"),
        t("features.accounting.points.point4"),
        t("features.accounting.points.point5"),
      ],
      className: "w-full md:w-[calc(33.333%-16px)]",
    },
    {
      Icon: Calendar,
      name: t("features.calendar.title"),
      description: t("features.calendar.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.calendar.points.point1"),
        t("features.calendar.points.point2"),
      ],
      className: "w-full md:w-[calc(33.333%-16px)]",
    },
    {
      Icon: ReceiptEuro,
      name: t("features.reservations.title"),
      description: t("features.reservations.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.reservations.points.point1"),
        t("features.reservations.points.point2"),
        t("features.reservations.points.point3"),
      ],
      className: "w-full md:w-[calc(33.333%-16px)]",
    },
    {
      Icon: IA,
      name: t("features.ia.title"),
      description: t("features.ia.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.ia.points.point1"),
        t("features.ia.points.point2"),
        t("features.ia.points.point3"),
        t("features.ia.points.point4"),
        t("features.ia.points.point5"),
      ],
      className: "w-full md:w-[calc(50%-16px)]",
    },
    {
      Icon: Bell,
      name: t("features.notifications.title"),
      description: t("features.notifications.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.notifications.points.point1"),
        t("features.notifications.points.point2"),
        t("features.notifications.points.point3"),
      ],
      className: "w-full md:w-[calc(50%-16px)]",
    },
  ];

  return (
    <section id="features" className="h-full w-full overflow-hidden relative">
      <div className="flex flex-col justify-center h-full w-full items-center content-center py-10 px-10">
        <div className="bg-gray/75 bg-transparent/10 rounded-[32px] border-1 border-[#D8D8D8] w-full dark:border-gray-300/50">
          <div className="flex flex-col text-center justify-center items-center content-center mt-10 px-4">
            <h1 className="text-[20px] md:text-[24px] font-bold">
              Notre application
            </h1>
            <h1 className="text-[40px] md:text-[75px] font-extrabold leading-[2.5rem] md:leading-[3.5rem]">
              Les fonctionnalités
            </h1>
            <p className="text-[14px] md:text-[16px] font-semibold leading-[1.5rem] md:leading-[3rem] px-2">
              Ce sont les fonctionnalités que nous avons prévues, aidez-nous à
              l&apos;améliorer pour en faire votre outil.
            </p>
          </div>

          <BentoGrid className="px-10 py-10">
            {features.map((feature, index) => (
              <BentoCard background={undefined} key={index} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
