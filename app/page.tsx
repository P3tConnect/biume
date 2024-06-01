import CallToActionSection from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SphereMask />
      <FeaturesSection />
      {/* <PricingSection /> */}
      <CallToActionSection />
      <SiteFooter />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={70}
        size={0.05}
        staticity={40}
        color={"#ffffff"}
      />
    </>
  );
}
