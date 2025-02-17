import { Card } from "@/components/ui/card";
import { ServicesGrid } from "./components/services/services-grid";
import { ActionResult } from "@/src/lib";
import { Service } from "@/src/db";
import { ServicesHeader } from "./components/services/services-header";
import { Suspense, use } from "react";
import { Skeleton } from "@/components/ui";

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
          <Suspense
            fallback={
              <Skeleton className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' />
            }
          >
            <ServicesGrid services={data} />
          </Suspense>
        </div>
      </div>
    </Card>
  );
};
