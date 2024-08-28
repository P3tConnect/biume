"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ToggleTheme } from "../toggle-theme";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between light:bg-background dark:bg-background h-auto pt-10 px-4 md:px-16">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/assets/images/logo-couleur.png"
          alt="logo Pawthera"
          width={218}
          height={66}
          className="w-20 sm:w-20 md:w-32 lg:w-44"
        />
      </Link>
      <div className="flex flex-row items-center justify-between">
        <Button
          onClick={() => {}}
          className="mr-2 md:mt-0 h-auto md:h-12 px-4 md:px-6 rounded-full bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black text-sm md:text-base"
        >
          Inscrivez-vous sur la liste d&apos;attente
        </Button>
        <ToggleTheme />
      </div>
    </div>
  );
}
