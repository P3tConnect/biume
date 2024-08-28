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
        {/* green top center */}
        <div className="absolute inset-0 top-[-110%] left-[10%] flex justify-center items-center -z-50">
          <div className="w-[667px] h-[558px] bg-[#6BDA97] rounded-full blur-3xl opacity-55"></div>
        </div>
        {/* purple center */}
        <div className="absolute inset-0  top-[-25%] right-[-15%] flex justify-center items-center -z-50">
          <div className="w-[1000px] h-[800px] rounded-full bg-gradient-to-r from-[#331CCCB2] via-[#B2387EB2] to-[#B2387EB2] opacity-[43%] blur-3xl"></div>
        </div>
        {/* blue bottom left */}
        <div className="absolute inset-0 right-[80%] flex justify-center items-center -z-50">
          <div className="w-[800px] h-[800px] rounded-full bg-[#08297B] opacity-[43%] blur-3xl"></div>
        </div>
        {/* pink bottom left */}
        <div className="absolute inset-0 bottom-[-60%] right-[80%] flex justify-center items-center -z-50">
          <div className="w-[696px] h-[695px] rounded-full bg-[#B2387E] opacity-35 blur-3xl"></div>
        </div>
        {/* orange bottom right */}
        <div className="absolute inset-0 bottom-[-30%] left-[80%] flex justify-center items-center -z-50">
          <div className="w-[1000px] h-[700px] rounded-full bg-[#FF950080]  blur-3xl"></div>
        </div>
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
