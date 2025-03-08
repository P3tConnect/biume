import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Checkbox } from "@/components/ui";

export interface Option {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface OptionsStepProps {
  availableOptions: Option[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
}

export function OptionsStep({
  availableOptions,
  selectedOptions,
  onToggleOption,
}: OptionsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        {availableOptions.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Aucune option disponible pour ce service
          </p>
        ) : (
          availableOptions.map((option) => (
            <div
              key={option.id}
              className={cn(
                "relative rounded-xl border p-4 transition-all hover:border-primary/50",
                selectedOptions.includes(option.id) &&
                  "border-primary bg-primary/5",
              )}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={() => onToggleOption(option.id)}
                  id={`option-${option.id}`}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`option-${option.id}`}
                    className="flex justify-between cursor-pointer"
                  >
                    <span className="font-medium">{option.name}</span>
                    <span className="font-medium text-muted-foreground">
                      +{option.price}€
                    </span>
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
