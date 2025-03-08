import { motion } from "framer-motion"
import { Home, Star } from "lucide-react"

import { Badge } from "@/components/ui"
import { cn } from "@/src/lib/utils"

interface ConsultationTypeStepProps {
  isHomeVisit: boolean
  onSelectType: (isHomeVisit: boolean) => void
}

export function ConsultationTypeStep({ isHomeVisit, onSelectType }: ConsultationTypeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectType(false)}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 p-6 transition-all",
            !isHomeVisit ? "border-primary bg-primary/5" : "hover:border-primary/50"
          )}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Au cabinet</h4>
              <p className="text-sm text-muted-foreground">Consultation classique au cabinet vétérinaire</p>
            </div>
            <Badge variant="secondary">Tarif standard</Badge>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectType(true)}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 p-6 transition-all",
            isHomeVisit ? "border-primary bg-primary/5" : "hover:border-primary/50"
          )}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">À domicile</h4>
              <p className="text-sm text-muted-foreground">Le vétérinaire se déplace chez vous</p>
            </div>
            <Badge variant="secondary">Frais supplémentaires</Badge>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
