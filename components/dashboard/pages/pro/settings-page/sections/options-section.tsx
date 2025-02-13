import { Button } from "@/components/ui/button";
import React from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OptionsGrid } from "./components/options/options-grid";
import { ActionResult } from "@/src/lib";
import { Option } from "@/src/db";
import { use } from "react";

export const OptionsSection = ({
  options,
}: {
  options: Promise<ActionResult<Option[]>>;
}) => {
  const data = use(options);

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Vos Options</h2>
            <Button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Plus className="h-4 w-4" />
              Nouvelle Option
            </Button>
          </div>

          <OptionsGrid options={data} />
        </div>
      </div>
    </Card>
  );
};
