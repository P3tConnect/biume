import { Button } from "@/components/ui/button";
import React, { use } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ServicesGrid } from "./components/services/services-grid";
import { ActionResult } from "@/src/lib";
import { Service } from "@/src/db";

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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Vos Services</h2>
            <Button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Plus className="h-4 w-4" />
              Nouveau Service
            </Button>
          </div>

          <ServicesGrid services={data} />
        </div>
      </div>
    </Card>
  );
};
