import { HeroSection } from "@/components/landing-page/components/user/hero-section";
import { FeaturesSection } from "@/components/landing-page/components/user/features-section";
import { TestimonialsSection } from "@/components/landing-page/components/user/testimonials-section";
import { PetsGallerySection } from "@/components/landing-page/components/user/pets-gallery-section";
import { CTASection } from "@/components/landing-page/components/user/cta-section";

export function UserLanding() {
  return (
    <div className="flex flex-col w-screen">
      <HeroSection />
      <FeaturesSection />
      <PetsGallerySection />
      <TestimonialsSection />
      <CTASection />
    </div >
  );
}