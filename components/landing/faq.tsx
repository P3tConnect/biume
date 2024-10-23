import Section from "@/components/landing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/src/config";
import BlurFade from "../blur-fade";

export default function FAQ() {
  return (
    <Section title="FAQ" subtitle="Questions fréquentes">
      <div className="mx-auto my-12 md:max-w-[800px]">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col items-center justify-center space-y-2"
        >
          {siteConfig.faqs.map((faq, idx) => (
            <BlurFade key={idx} className="w-full" delay={0.2 + idx * 0.2} inView>
              <AccordionItem
                key={idx}
                value={faq.question}
                className="w-full border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            </BlurFade>
          ))}
        </Accordion>
      </div>
      <h4 className="mb-12 text-center text-sm font-medium tracking-tight text-foreground/80">
        Vous avez toujours des questions ? Envoyez un email a{" "}
        <a href={`mailto:${siteConfig.links.email}`} className="underline">
          {siteConfig.links.email}
        </a>
      </h4>
    </Section>
  );
}
