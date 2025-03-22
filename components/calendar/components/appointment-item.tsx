import { motion } from "framer-motion"
import { Appointment } from "@/src/db/appointments"
import { cn } from "@/src/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Users, Euro, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AppointmentItemProps {
  appointment: Appointment
  position: { top: string; height: string }
  status: { color: string; label: string }
  onClick: () => void
  isGroup?: boolean
  totalPets?: number
  relatedAppointments: Appointment[]
}

const appointmentVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
}

interface HeaderProps {
  startTime: Date
  endTime: Date
  status: { label: string }
  isGroup: boolean
  relatedAppointments: Appointment[]
}

function Header({ startTime, endTime, status, isGroup, relatedAppointments }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {format(startTime, "HH:mm", { locale: fr })} - {format(endTime, "HH:mm", { locale: fr })}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-[8px] px-1 py-0 h-3.5",
            isGroup
              ? "bg-secondary/20"
              : {
                "border-emerald-500/50 bg-emerald-50 text-emerald-600": status.label === "Confirmé",
                "border-orange-500/50 bg-orange-50 text-orange-600": status.label === "En attente",
                "border-red-500/50 bg-red-50 text-red-600": status.label === "Annulé",
                "border-blue-500/50 bg-blue-50 text-blue-600": status.label === "Terminé",
              }
          )}
        >
          {isGroup ? `${relatedAppointments.length} RDV` : status.label}
        </Badge>
      </div>
    </div>
  )
}

interface GroupContentProps {
  totalPets: number
  totalPrice: number
  service?: { description: string | null }
}

function GroupContent({ totalPets, totalPrice, service }: GroupContentProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Users className="h-3 w-3" />
        <span>{totalPets} patients</span>
        {totalPrice > 0 && (
          <>
            <span className="mx-1">•</span>
            <Euro className="h-3 w-3" />
            <span>{totalPrice}€</span>
          </>
        )}
      </div>
      {service && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Tag className="h-3 w-3" />
          <span className="truncate">{service.description}</span>
        </div>
      )}
    </div>
  )
}

interface SingleAppointmentContentProps {
  pets?: Array<{ pet: { name: string } }>
  client?: { name: string }
  service?: { price: number | null; description: string | null }
}

function SingleAppointmentContent({ pets, client, service }: SingleAppointmentContentProps) {
  return (
    <div className="flex flex-col gap-0.5 min-h-0">
      <div className="font-medium truncate">{pets?.map(pet => pet.pet.name).join(", ")}</div>
      <div className="text-muted-foreground truncate flex items-center gap-1">
        <span>{client?.name}</span>
        {service?.price && (
          <>
            <span className="mx-1">•</span>
            <Euro className="h-3 w-3" />
            <span>{service.price}€</span>
          </>
        )}
      </div>
      {service && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <Tag className="h-3 w-3" />
          <span className="truncate">{service.description}</span>
        </div>
      )}
    </div>
  )
}

export function AppointmentItem({
  appointment,
  position,
  status,
  onClick,
  isGroup = false,
  totalPets = 0,
  relatedAppointments,
}: AppointmentItemProps) {
  const startTime = appointment.slot?.start ? new Date(appointment.slot.start) : null
  const endTime = appointment.slot?.end ? new Date(appointment.slot.end) : null
  const displayedPets = totalPets || appointment.pets?.length || 0

  if (!startTime || !endTime) return null

  const totalPrice = isGroup
    ? relatedAppointments.reduce((total, apt) => total + (apt.service?.price || 0), 0)
    : appointment.service?.price || 0

  return (
    <motion.div
      className={cn(
        "absolute inset-x-1 z-10",
        "text-[10px] sm:text-xs truncate rounded-lg px-2 py-1.5",
        "flex flex-col gap-1",
        isGroup
          ? "bg-secondary/10 dark:bg-secondary/30 text-secondary dark:text-secondary-foreground border border-secondary/20 dark:border-secondary/40"
          : "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-800",
        "cursor-pointer hover:shadow-md transition-shadow"
      )}
      style={position}
      variants={appointmentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      onClick={onClick}
      layoutId={`appointment-${appointment.id}`}
    >
      <Header
        startTime={startTime}
        endTime={endTime}
        status={status}
        isGroup={isGroup}
        relatedAppointments={relatedAppointments}
      />

      {isGroup ? (
        <GroupContent
          totalPets={displayedPets}
          totalPrice={totalPrice}
          service={appointment.service}
        />
      ) : (
        <SingleAppointmentContent
          pets={appointment.pets}
          client={appointment.client}
          service={appointment.service}
        />
      )}
    </motion.div>
  )
}
