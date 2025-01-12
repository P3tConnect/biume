import { HeroSection } from "./sections/user/hero-section";
import { FeaturesSection } from "./sections/user/features-section";
import { TestimonialsSection } from "./sections/user/testimonials-section";
import { PetsGallerySection } from "./sections/user/pets-gallery-section";
import { CTASection } from "./sections/user/cta-section";

export function UserLanding() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <HeroSection />
      <FeaturesSection />
      <PetsGallerySection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
} 