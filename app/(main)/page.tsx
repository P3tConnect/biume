// import { Bubbles } from "@/components/landing/bubbles";
import { CallToAction } from '@/components/landing/cta-section';
import FeaturesSection from '@/components/landing/features';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Problem from '@/components/landing/problem';
// import { Pricing } from '@/components/landing/pricings';
import FAQ from '@/components/landing/faq';

export default function Home() {
  return (
    <main className='w-screen overflow-x-hidden h-screen'>
      <Header />
      <Hero />
      <Problem />
      <FeaturesSection />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
