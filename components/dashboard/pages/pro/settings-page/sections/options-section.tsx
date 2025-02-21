import { Card } from "@/components/ui/card";
import { OptionsGrid } from "./components/options/options-grid";
import { OptionsHeader } from "./components/options/options-header";
import { ActionResult } from "@/src/lib";
import { Option } from "@/src/db";

export const OptionsSection = ({
  options,
}: {
  options: ActionResult<Option[]>;
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <OptionsHeader />
          <OptionsGrid options={options} />
        </div>
      </div>
    </Card>
  );
};
