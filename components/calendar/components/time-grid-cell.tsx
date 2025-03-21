import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface TimeGridCellProps {
  onDateSelect: () => void
  onAddClick: (e: React.MouseEvent) => void
}

export const addButtonVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
}

export function TimeGridCell({ onDateSelect, onAddClick }: TimeGridCellProps) {
  return (
    <motion.div
      className={cn("h-20 border-b border-r border-border relative", "group cursor-pointer hover:bg-muted/50")}
      onClick={onDateSelect}
    >
      <motion.div
        className="absolute bottom-1 right-1"
        variants={addButtonVariants}
        initial="initial"
        whileHover="animate"
        exit="exit"
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onAddClick}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
