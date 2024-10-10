// import { Bubbles } from "@/components/landing/bubbles";
import CallToActionSection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Problem from "@/components/landing/problem";
import PricingSection from "@/components/landing/pricings";
import Solution from "@/components/landing/solution";
import FAQ from "@/components/landing/faq";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden relative">
        <Header />
        <Hero />
        <Problem />
        <Solution />
        <FeaturesSection />
        <PricingSection />
        <FAQ />
        <CallToActionSection />
        <Footer />
        {/* <Bubbles /> */}
        {/* <div className="hidden lg:block w-full absolute top-[0%] right-[-28%] -z-30">
        <Bubbles />
        <div className="hidden lg:block w-full absolute top-[0%] right-[-28%] -z-30">
          <Image
            src={ImagePawthera}
            alt="hero image"
            width={1404}
            height={938}
          />
        </div> */}
      </div>
    </>
  );
}
