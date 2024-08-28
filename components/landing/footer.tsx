"use client";

import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="h-[366px] w-full bg-gray">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col justify-center content-center items-center py-10 px-10 text-center w-full h-full">
          <Image
            src="/assets/images/title.png"
            alt="logo pawthera"
            width={346}
            height={55}
          />
          <p className="text-white text-[20px] font-semibold mt-10">
            L'application qui fait gagner du temps aux indépendants du secteur
            animalier
          </p>
        </div>
        <div className="h-[1px] w-full bg-white my-5"></div>
        <div className="flex flex-col md:flex-row justify-between mb-10 px-10">
          <div className="flex flex-row justify-center items-center text-center content-center gap-4 mb-4 md:mb-0">
            <InstagramLogoIcon className="text-white" width={24} height={25} />
            <LinkedInLogoIcon className="text-white" width={24} height={25} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-white">
              Copyright © 2024 PawThera. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
