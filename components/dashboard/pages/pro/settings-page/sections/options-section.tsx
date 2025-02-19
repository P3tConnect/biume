import { Card } from "@/components/ui/card";
import { OptionsGrid } from "./components/options/options-grid";
import { OptionsHeader } from "./components/options/options-header";
import { Suspense } from "react";
import { getOptionsFromOrganization } from "@/src/actions";
import { Skeleton } from "@/components/ui";

export const OptionsSection = () => {
  const options = getOptionsFromOrganization({});

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <OptionsHeader />
          <Suspense
            fallback={
              <Skeleton className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />
            }
          >
            <OptionsGrid options={options} />
          </Suspense>
        </div>
      </div>
    </Card>
  );
};
