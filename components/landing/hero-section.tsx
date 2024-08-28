"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import MockUpMac from "@/public/assets/images/Mock-up-mac.png";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("LandingPage");

  return (
    <>
      <section id="hero" className="h-screen w-full overflow-hidden relative">
        <div className="flex flex-col lg:flex-row justify-between items-center content-center h-full w-full">
          <div className="flex flex-col justify-center content-center items-center lg:items-start w-full mt-10 lg:mt-40 p-4 lg:pl-20">
            <div className=" mb-5 text-center lg:text-left">
              <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold leading-tight lg:leading-[5.5rem]">
                Bienvenue
              </h1>
              <h1 className="text-[48px] md:text-[72px] lg:text-[96px] font-extrabold leading-tight lg:leading-[5.5rem]">
                sur <span className="text-secondary">Pawthera</span>
              </h1>
            </div>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-center lg:text-left">
              Simplifiez la gestion
              <span className="font-extrabold">
                {" "}
                de votre entreprise animalière{" "}
              </span>
              avec PawThera. <br /> Et consacrez votre énergie sur
              <span className="font-extrabold"> nos amis à quatre pattes.</span>
            </p>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeUejqORcN5BQoxeWGsQbgjHiGCQrHK1NjlXQ4LziLitZV1UA/viewform?usp=send_form">
              <Button className="rounded-full h-12 md:h-14 mt-6 md:mt-10 bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black darl:hover:bg-white dark:hover:text-black">
                Répondez à notre enquête
              </Button>
            </Link>
          </div>
          <div className="block lg:hidden w-full">
            <Image
              src={MockUpMac}
              alt="hero image tablet"
              width={1404}
              height={938}
            />
          </div>
        </div>
      </section>
    </>
  );
}
