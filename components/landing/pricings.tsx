import { Check, HelpCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Section from "./section";

const tiers = [
  {
    name: "Start",
    price: "Free",
    priceAmount: 0,
    duration: "3 months",
    description: "For individuals just getting started",
    buttonText: "Try for free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$38",
    priceAmount: 38,
    duration: "per month",
    billing: "$456 billed annually",
    description: "For professionals and small teams",
    buttonText: "Subscribe",
    popular: true,
  },
  {
    name: "Business",
    price: "$78",
    priceAmount: 78,
    duration: "per month",
    billing: "$936 billed annually",
    description: "For larger teams and enterprises",
    buttonText: "Contact sales",
    popular: false,
  },
];

const features = [
  "Core features",
  "Advanced analytics",
  "Priority support",
  "Custom integrations",
  "API access",
  "Enterprise security",
  "Dedicated account manager",
  "Custom contracts",
  "SLA guarantees",
];

const featureAvailability = [
  [true, true, true],
  [true, true, true],
  [false, true, true],
  ["Limited", "Full", "Full"],
  [false, true, true],
  [false, true, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
];

export function Pricing() {
  return (
    <Section title="Pricing" subtitle="Choose the plan that's right for you">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left font-medium"></th>
              {tiers.map((tier, index) => (
                <th key={tier.name} className="p-4 text-center font-medium">
                  <div
                    className={`rounded-2xl p-6 ${
                      tier.popular ? "bg-gray-100 ring-2 ring-primary" : ""
                    }`}
                  >
                    {tier.popular && (
                      <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                        Most popular
                      </span>
                    )}
                    <div className="text-lg font-semibold mb-2">
                      {tier.name}
                    </div>
                    <div className="flex items-baseline justify-center mb-1">
                      <span className="text-4xl font-bold">
                        {tier.priceAmount === 0
                          ? "Free"
                          : `$${tier.priceAmount}`}
                      </span>
                      {tier.priceAmount !== 0 && (
                        <span className="text-xl font-normal text-gray-500 ml-1">
                          /{tier.duration.split(" ")[1]}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-4 h-8">
                      {tier.priceAmount === 0 ? tier.duration : tier.billing}
                    </div>
                    <p className="text-sm text-gray-600 mb-6 h-12">
                      {tier.description}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {tiers.map((tier, index) => (
                <td key={`button-${tier.name}`} className="p-4 text-center">
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-white text-primary border border-primary hover:bg-primary/10"
                    }`}
                  >
                    {tier.buttonText}
                  </Button>
                </td>
              ))}
            </tr>
            {features.map((feature, index) => (
              <tr key={feature} className="border-t border-gray-100">
                <td className="py-4 px-4 flex items-center">
                  <span className="font-medium">{feature}</span>
                  <HelpCircle
                    className="ml-2 h-4 w-4 text-gray-400"
                    aria-label={`More info about ${feature}`}
                  />
                </td>
                {featureAvailability[index].map((available, tierIndex) => (
                  <td key={tierIndex} className="py-4 px-4 text-center">
                    {typeof available === "boolean" ? (
                      available ? (
                        <Check
                          className="mx-auto h-5 w-5 text-primary"
                          aria-label="Included"
                        />
                      ) : (
                        <X
                          className="mx-auto h-5 w-5 text-gray-300"
                          aria-label="Not included"
                        />
                      )
                    ) : (
                      <span className="text-sm text-gray-600">{available}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <p className="mt-12 text-center text-sm text-gray-500">
        All plans include a 14-day free trial. No credit card required.
      </p> */}
    </Section>
  );
}
