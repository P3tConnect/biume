import { Card } from "@/components/ui/card";
import { OptionsGrid } from "./components/options/options-grid";
import { OptionsHeader } from "./components/options/options-header";
import { getOptionsFromOrganization } from "@/src/actions";
import { Skeleton } from "@/components/ui";
import { Suspense } from "react";

export const OptionsSection = async () => {
  const options = await getOptionsFromOrganization({});

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <OptionsHeader />
          <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <OptionsGrid options={options} />
          </Suspense>
        </div>
      </div>
    </Card>
  );
};
