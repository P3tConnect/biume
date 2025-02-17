import { Card } from "@/components/ui/card";
import { OptionsGrid } from "./components/options/options-grid";
import { ActionResult } from "@/src/lib";
import { Option } from "@/src/db";
import { OptionsHeader } from "./components/options/options-header";
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
          <OptionsHeader />
          <OptionsGrid options={data} />
        </div>
      </div>
    </Card>
  );
};
