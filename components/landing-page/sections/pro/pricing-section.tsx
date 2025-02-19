import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { pricingPlans } from "./data";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

export function PricingSection() {
  return (
    <section className="py-16 sm:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
            Des forfaits adaptés à vos besoins
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Choisissez le plan qui correspond le mieux à vos attentes
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${plan.popular ? "scale-105" : ""}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className={`relative p-8 rounded-2xl border transition-colors duration-300 ${plan.popular
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:border-primary/50"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary px-4 py-1 rounded-full text-sm font-semibold">
                    Le plus populaire
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}€</span>
                    <span className={cn(
                      plan.popular ? "text-white" : "text-muted-foreground"
                    )}>
                      /mois
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2
                        className={`w-5 h-5 ${plan.popular
                          ? "text-primary-foreground"
                          : "text-primary"
                          }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full h-12 ${plan.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  asChild
                >
                  <Link href="#waitlist">
                    Je m&apos;inscris à la liste d&apos;attente
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 