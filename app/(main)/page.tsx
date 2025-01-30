<<<<<<< HEAD
// import { Bubbles } from "@/components/landing/bubbles";
import { CallToAction } from '@/components/landing/cta-section';
import FeaturesSection from '@/components/landing/features';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Problem from '@/components/landing/problem';
// import { Pricing } from '@/components/landing/pricings';
import FAQ from '@/components/landing/faq';
=======
"use client";

import { useSearchParams } from "next/navigation";
import { Header } from "@/components/landing-page/header";
import { UserLanding } from "@/components/landing-page/user-landing";
import { ProLanding } from "@/components/landing-page/pro-landing";
>>>>>>> 9bd6fd37893a04e1a95615e9269f46b92750065e

export default function Home() {
  const searchParams = useSearchParams();
  const version = searchParams.get("version") || "user";

  return (
<<<<<<< HEAD
    <main className='w-screen overflow-x-hidden h-screen'>
=======
    <>
>>>>>>> 9bd6fd37893a04e1a95615e9269f46b92750065e
      <Header />
      <main className="pt-16">
        {version === "user" ? <UserLanding /> : <ProLanding />}
      </main>
    </>
  );
}
