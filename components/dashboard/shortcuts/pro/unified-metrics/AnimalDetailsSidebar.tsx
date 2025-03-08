"use client"

import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarDays, FileClock, FileText, HeartPulseIcon, Info } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { ActiveTab, AnimalDetails } from "./types"

interface AnimalDetailsSidebarProps {
  animal: AnimalDetails
  activeTab: ActiveTab
  setActiveTab: (tab: ActiveTab) => void
}

export const AnimalDetailsSidebar = ({ animal, activeTab, setActiveTab }: AnimalDetailsSidebarProps) => {
  // Calcul de l'âge basé sur la date de naissance
  const getAge = () => {
    if (!animal.birthDate) return "Âge inconnu"

    const age = formatDistanceToNow(new Date(animal.birthDate), {
      addSuffix: false,
      locale: fr,
    })

    return age
  }

  // Formater la date au format lisible
  const formatDate = (dateString: string) => {
    if (!dateString) return "Non défini"

    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="w-full md:w-64 border-r bg-muted/10 flex flex-col">
      {/* En-tête avec image de profil et info de base */}
      <div className="p-6 flex flex-col items-center text-center border-b">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={animal.profileImage} alt={animal.name} />
          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
            {animal.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-bold mb-1">{animal.name}</h2>

        <div className="space-y-1 w-full mb-3">
          <p className="text-sm text-muted-foreground">
            {animal.species} • {animal.breed}
          </p>
          <p className="text-sm text-muted-foreground">
            {animal.gender === "male" ? "Mâle" : "Femelle"} • {getAge()}
          </p>
          <Badge variant="outline" className="mt-2">
            Patient ID: {animal.id.substring(0, 8)}
          </Badge>
        </div>

        <div className="text-sm text-left w-full mt-3">
          <p className="flex items-center gap-1 mb-1">
            <span className="font-medium">Propriétaire:</span> {animal.ownerName}
          </p>
          <p className="flex items-center gap-1">
            <span className="font-medium">Contact:</span> {animal.ownerContact}
          </p>
        </div>
      </div>

      {/* Navigation entre les onglets */}
      <nav className="flex flex-col p-2 gap-1 flex-1">
        <Button
          variant={activeTab === "info" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("info")}
        >
          <Info className="mr-2 h-4 w-4" />
          Informations
        </Button>

        <Button
          variant={activeTab === "medical" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("medical")}
        >
          <HeartPulseIcon className="mr-2 h-4 w-4" />
          Dossier médical
        </Button>

        <Button
          variant={activeTab === "appointments" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("appointments")}
        >
          <FileClock className="mr-2 h-4 w-4" />
          Rendez-vous
        </Button>

        <Button
          variant={activeTab === "documents" ? "secondary" : "ghost"}
          className="justify-start"
          onClick={() => setActiveTab("documents")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </Button>
      </nav>

      {/* Pied de sidebar avec date de dernière visite */}
      {animal.appointments && animal.appointments.length > 0 && (
        <div className="p-4 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            <span>Dernière visite:</span>
          </div>
          <p className="font-medium">
            {formatDate(
              animal.appointments
                .filter(apt => apt.status === "completed")
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date || ""
            )}
          </p>
        </div>
      )}
    </div>
  )
}
