import { Card } from "@/components/ui/card";
import { ServicesGrid } from "./components/services/services-grid";
import { ServicesHeader } from "./components/services/services-header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui";
import { ActionResult } from "@/src/lib";
import { Service } from "@/src/db";
import { getServicesFromOrganization } from "@/src/actions";

export const ServicesSection = async () => {
  const services = await getServicesFromOrganization({});

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <ServicesHeader />
          <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <ServicesGrid services={services} />
          </Suspense>
        </div>
      </div>
    </Card>
  );
};
