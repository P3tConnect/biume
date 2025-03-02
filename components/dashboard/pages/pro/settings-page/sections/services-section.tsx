"use client";

import { Card } from "@/components/ui/card";
import { ServicesGrid } from "./components/services/services-grid";
import { ServicesHeader } from "./components/services/services-header";
import { getServicesFromOrganization } from "@/src/actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ServiceForm } from "./components/services/services-form";

export const ServicesSection = () => {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getServicesFromOrganization({}),
  });

  const [isCreating, setIsCreating] = useState(false);
  const hasServices = services?.data && services.data.length > 0;

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          {hasServices && <ServicesHeader onCreateNew={() => setIsCreating(true)} />}
          <ServicesGrid
            services={services?.data || []}
            onAddFirstService={() => setIsCreating(true)}
          />
        </div>
      </div>

      <ServiceForm
        service={{
          name: "",
          description: "",
          duration: 30,
          price: 0,
          image: null,
        }}
        open={isCreating}
        onOpenChange={(open) => setIsCreating(open)}
      />
    </Card>
  );
};
