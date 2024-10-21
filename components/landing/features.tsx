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
import Section from "./section";
import { FeatureScroll1, FeatureScrollContainer } from "../feature_scroll";
import { cn } from "@/src/lib";
import { motion } from "framer-motion";
import Safari from "../safari";

export default function FeaturesSection() {
  const t = useScopedI18n("landingPage");

  const features = [
    {
      Icon: BrainCircuit,
      name: t("features.ia.title"),
      description: t("features.ia.description"),
      href: "/",
      cta: t("features.more"),
      direction: "ltr" as "rtl" | "ltr",
      points: [
        t("features.ia.points.point1"),
        t("features.ia.points.point2"),
        t("features.ia.points.point3"),
        t("features.ia.points.point4"),
        t("features.ia.points.point5"),
      ],
      background: (
        <>
          <Safari
            src={`/PawThera.jpeg`}
            url="https://pawthera.com"
            className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
          />
        </>
      ),
      className: "hover:bg-red-500/10 transition-all duration-500 ease-out",
    },
    {
      Icon: ScrollText,
      name: t("features.accounting.title"),
      description: t("features.accounting.description"),
      href: "/",
      cta: t("features.more"),
      direction: "rtl" as "rtl" | "ltr",
      points: [
        t("features.accounting.points.point1"),
        t("features.accounting.points.point2"),
        t("features.accounting.points.point3"),
        t("features.accounting.points.point4"),
        t("features.accounting.points.point5"),
      ],
      background: (
        <Safari
          src={`/PawThera.jpeg`}
          url="https://pawthera.com"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
      className:
        "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
    },
    {
      Icon: ReceiptEuro,
      name: t("features.reservations.title"),
      description: t("features.reservations.description"),
      href: "/",
      cta: t("features.more"),
      direction: "ltr" as "rtl" | "ltr",
      points: [
        t("features.reservations.points.point1"),
        t("features.reservations.points.point2"),
        t("features.reservations.points.point3"),
      ],
      background: (
        <Safari
          src={`/PawThera.jpeg`}
          url="https://pawthera.com"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
      className:
        "md:row-span-2 hover:bg-orange-500/10 transition-all duration-500 ease-out",
    },
    {
      Icon: CalendarIcon,
      name: t("features.calendar.title"),
      description: t("features.calendar.description"),
      href: "/",
      cta: t("features.more"),
      direction: "rtl" as "rtl" | "ltr",
      points: [
        t("features.calendar.points.point1"),
        t("features.calendar.points.point2"),
      ],
      background: (
        <Safari
          src={`/PawThera.jpeg`}
          url="https://pawthera.com"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
      className:
        "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
    },
    {
      Icon: BellIcon,
      name: t("features.notifications.title"),
      description: t("features.notifications.description"),
      href: "/",
      cta: t("features.more"),
      direction: "ltr" as "rtl" | "ltr",
      points: [
        t("features.notifications.points.point1"),
        t("features.notifications.points.point2"),
      ],
      background: (
        <Safari
          src={`/PawThera.jpeg`}
          url="https://pawthera.com"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      ),
      className:
        "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
    },
  ];

  return (
    <Section title="Solution" subtitle="Découvrez les fonctionnalités">
      <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl",
              feature.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                {feature.name}
              </h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
            {feature.background}
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
      {/* <div className="flex flex-col gap-20 container p-10">
        <FeatureScrollContainer
          topPosition="10%"
          direction="rtl"
          imageSrc="https://cdn.magicui.design/iphone.png"
        >
          <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0 items-center justify-center lg:items-start lg:justify-start text-center lg:text-left">
            <h1 className="text-4xl font-bold">Scroll Feature</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quibusdam.
            </p>
            <div className="flex gap-4 w-full">
              <button className="bg-neutral-100 text-black px-4 py-2 rounded-md w-full">
                Learn More
              </button>
            </div>
          </div>
        </FeatureScrollContainer>

        <FeatureScrollContainer
          topPosition="10%"
          direction="ltr"
          imageSrc="https://cdn.magicui.design/iphone.png"
        >
          <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0 items-center justify-center lg:items-start lg:justify-start text-center lg:text-left">
            <h1 className="text-4xl font-bold">Scroll Feature</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quibusdam.
            </p>
            <div className="flex gap-4">
              <button className="bg-neutral-100 text-black px-4 py-2 rounded-md">
                Learn More
              </button>
              <button className="bg-neutral-800 text-white px-4 py-2 rounded-md">
                Learn More
              </button>
            </div>
          </div>
        </FeatureScrollContainer>
      </div> */}
    </Section>
  );
}
