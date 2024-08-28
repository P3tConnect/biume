import { Bubbles } from "@/components/landing/bubbles";
import CallToActionSection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import Image from "next/image";
import ImagePawthera from "@/public/assets/images/window-pawthera-hero-section.png";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden relative">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />
        <Footer />
        {/*<SphereMask />*/}
        {/* <PricingSection /> */}
        {/*<CallToActionSection />*/}
        {/*<SiteFooter />*/}
        {/*<Particles*/}
        {/*  className="absolute inset-0 -z-10"*/}
        {/*  quantity={50}*/}
        {/*  ease={70}*/}
        {/*  size={0.05}*/}
        {/*  staticity={40}*/}
        {/*  color={"#ffffff"}*/}
        {/*/>*/}
        <Bubbles />
        <div className="hidden lg:block w-full absolute top-[0%] right-[-28%] -z-30">
          <Image
            src={ImagePawthera}
            alt="hero image"
            width={1404}
            height={938}
          />
        </div>
      </div>
    </>
  );
}
