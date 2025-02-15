import { Card } from "@/components/ui/card";
import { ServicesGrid } from "./components/services/services-grid";
import { ActionResult } from "@/src/lib";
import { Service } from "@/src/db";
import { ServicesHeader } from "./components/services/services-header";
import { use } from "react";

export const ServicesSection = ({
  services,
}: {
  services: Promise<ActionResult<Service[]>>;
}) => {
  const data = use(services);

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <ServicesHeader />
          <ServicesGrid services={data} />
        </div>
      </div>
    </Card>
  );
};
