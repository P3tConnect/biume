"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, MapPin, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProfessionalCardProps {
  professional: {
    id: string
    name: string
    specialty: string
    avatar?: string
    rating?: number
    location?: string
    nextAvailability?: string
    services: Array<{
      id: string
      name: string
      duration: number
      price: number
    }>
  }
  onSelectProfessional: (professionalId: string) => void
  isSelected?: boolean
}

export function ProfessionalCard({ professional, onSelectProfessional, isSelected }: ProfessionalCardProps) {
  return (
    <Card className={`transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={professional.avatar} />
            <AvatarFallback className="bg-primary/10">
              {professional.name
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{professional.name}</h3>
            <p className="text-sm text-muted-foreground">{professional.specialty}</p>
            {professional.rating && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{professional.rating}</span>
              </div>
            )}
          </div>
          <Button variant={isSelected ? "default" : "outline"} onClick={() => onSelectProfessional(professional.id)}>
            {isSelected ? "Sélectionné" : "Choisir"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {professional.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{professional.location}</span>
            </div>
          )}
          {professional.nextAvailability && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                Prochaine disponibilité :{" "}
                <span className="font-medium text-green-600 dark:text-green-500">{professional.nextAvailability}</span>
              </span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {professional.services.map(service => (
              <Badge key={service.id} variant="secondary" className="text-xs">
                {service.name} • {service.duration}min • {service.price}€
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
