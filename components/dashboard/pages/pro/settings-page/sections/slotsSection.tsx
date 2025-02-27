import React, { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from "@/components/ui";
import SlotsSectionClient from "./components/slots/slots-section-client";
import { getOrganizationSlots } from "@/src/actions";

const SlotsSection = async () => {
  const slots = await getOrganizationSlots({});

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Créneaux disponibles</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez vos créneaux horaires et leur disponibilité
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <SlotsSectionClient slots={slots.data ?? []} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default SlotsSection;
