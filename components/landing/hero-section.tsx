"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("LandingPage");

  return (
    <section
      id="hero"
      className="relative mx-auto flex flex-col justify-center items-center h-screen w-screen max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0">
        
      </div>
      <h1 className="bg-gradient-to-br from-white from-30% to-white/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        {t('title1')}
        <br className="hidden md:block" /> {t('title2')}
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        {t('presentation1')}
        <br className="hidden md:block" /> {t('presentation2')}
      </p>
      <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-black opacity-0 ease-in-out [--animation-delay:600ms]" asChild>
        <Link href="https://forms.gle/k1wZwzPw77zE5Pj19" target="_blank">
          <span>{t('survey')}</span>
          <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </Link>
      </Button>
    </section>
  );
}


