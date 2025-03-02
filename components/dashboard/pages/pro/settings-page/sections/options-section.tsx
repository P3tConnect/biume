"use client";

import { Card } from "@/components/ui/card";
import { OptionsGrid } from "./components/options/options-grid";
import { OptionsHeader } from "./components/options/options-header";
import { getOptionsFromOrganization } from "@/src/actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { OptionForm } from "./components/options/option-form";

export const OptionsSection = () => {
  const { data: options } = useQuery({
    queryKey: ["options"],
    queryFn: () => getOptionsFromOrganization({}),
  });

  const [isCreating, setIsCreating] = useState(false);
  const hasOptions = options?.data && options.data.length > 0;

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          {hasOptions && <OptionsHeader onCreateNew={() => setIsCreating(true)} />}
          <OptionsGrid
            options={options?.data || []}
            onAddFirstOption={() => setIsCreating(true)}
          />
        </div>
      </div>

      <OptionForm
        option={{
          title: "",
          description: null,
          price: 0,
        }}
        open={isCreating}
        onOpenChange={(open) => setIsCreating(open)}
      />
    </Card>
  );
};
