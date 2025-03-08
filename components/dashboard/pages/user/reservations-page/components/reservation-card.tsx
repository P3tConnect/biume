"use client"

import { Calendar, Clock, Home, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Avatar, Badge, Button, Card, Skeleton } from "@/components/ui"
import { cn } from "@/src/lib"

interface ReservationCardProps {
  reservation: {
    id: string
    petName: string
    sitterName: string
    startDate: string
    endDate: string
    location: string
    status: "pending" | "confirmed" | "completed" | "cancelled"
    price: number
    image?: string | null
    sitterImage?: string | null
    metier: string
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const ReservationCard = ({ reservation, onEdit, onDelete }: ReservationCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-white/10 text-yellow-500"
      case "confirmed":
        return "bg-white/10 text-green-500"
      case "completed":
        return "bg-white/10 text-blue-500"
      case "cancelled":
        return "bg-white/10 text-red-500"
      default:
        return "bg-white/10 text-white-500"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Card className="group overflow-hidden">
      <div className="relative h-[280px]">
        <div className="absolute inset-0">
          {reservation.image ? (
            <>
              {isImageLoading && <Skeleton className="h-full w-full" />}
              <Image
                width={100}
                height={100}
                src={reservation.image}
                alt={`Photo de ${reservation.petName}`}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                  isImageLoading && "invisible"
                )}
                onLoad={() => setIsImageLoading(false)}
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <Home className="h-24 w-24 text-muted-foreground/20" />
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {onEdit && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={() => onEdit(reservation.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 rounded-full"
              onClick={() => onDelete(reservation.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-4 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={cn("capitalize", getStatusColor(reservation.status))}>
                {reservation.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-white">{reservation.petName}</h3>
              <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <div className="flex items-start flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <Image
                      width={100}
                      height={100}
                      src={reservation.sitterImage || ""}
                      alt={reservation.sitterName}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-white/90">{reservation.sitterName}</span>
                    <span className="text-sm font-bold text-white/90">{reservation.metier}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm">
              <Calendar className="h-4 w-4" />
              <span className="font-bold">{formatDate(reservation.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm">
              <Clock className="h-4 w-4" />
              <div className="flex flex-row items-center gap-1">
                <span className="font-bold">{reservation.price}€</span>
                <span>/ la séance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ReservationCard
