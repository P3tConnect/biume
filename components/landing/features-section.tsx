"use client";

import {
  BellIcon,
  BrainCircuit,
  CalendarIcon,
  ReceiptEuro,
  ScrollText,
} from "lucide-react";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

import React from "react";
import { useScopedI18n } from "@/src/locales";

export default function FeaturesSection() {
  const t = useScopedI18n("landingPage");

  const features = [
    {
      Icon: BrainCircuit,
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
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: ScrollText,
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
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
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
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: t("features.calendar.title"),
      description: t("features.calendar.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.calendar.points.point1"),
        t("features.calendar.points.point2"),
      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: t("features.notifications.title"),
      description: t("features.notifications.description"),
      href: "/",
      cta: t("features.more"),
      points: [
        t("features.notifications.points.point1"),
        t("features.notifications.points.point2"),
      ],
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <section id="features" className="h-full w-full overflow-hidden relative">
      <div className="flex flex-col justify-center h-full w-full items-center content-center py-10 px-10">
        <div className="bg-gray/75 rounded-[32px] border-1 p-10 border-[#D8D8D8] w-full dark:border-gray-300/50 dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-lg">
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

          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature, index) => (
              <BentoCard key={index} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
