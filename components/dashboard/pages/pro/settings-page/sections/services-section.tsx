import { Card } from "@/components/ui/card";
import { ServicesGrid } from "./components/services/services-grid";
import { ServicesHeader } from "./components/services/services-header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { ActionResult } from "@/src/lib";
import { Service } from "@/src/db";

export const ServicesSection = ({
  services,
}: {
  services: ActionResult<Service[]>;
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <ServicesHeader />
          <ServicesGrid services={services} />
        </div>
      </div>
    </Card>
  );
};
