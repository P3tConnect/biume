// import { Bubbles } from "@/components/landing/bubbles";
import { CallToAction } from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Problem from "@/components/landing/problem";
import { Pricing } from "@/components/landing/pricings";
import Solution from "@/components/landing/solution";
import FAQ from "@/components/landing/faq";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      {/* <Solution /> */}
      <FeaturesSection />
      {/* <Pricing /> */}
      <FAQ />
      <CallToAction />
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
    </main>
  );
}
