import { HeroSection } from "./components/user/hero-section";
import { FeaturesSection } from "./components/user/features-section";
import { TestimonialsSection } from "./components/user/testimonials-section";
import { PetsGallerySection } from "./components/user/pets-gallery-section";
import { CTASection } from "./components/user/cta-section";

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