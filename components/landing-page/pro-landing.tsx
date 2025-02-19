import { motion } from "framer-motion";
import { HeroSection } from "./sections/pro/hero-section";
import { FeaturesSection } from "./sections/pro/features-section";
// import { TestimonialsSection } from "./sections/pro/testimonials-section";
import { PricingSection } from "./sections/pro/pricing-section";
import { CTASection } from "./sections/pro/cta-section";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export function ProLanding() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <FeaturesSection />
      </motion.div>

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <TestimonialsSection />
      </motion.div> */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <PricingSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <CTASection />
      </motion.div>
    </div>
  );
}
