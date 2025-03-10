"use client"

import { format, isFuture, isValid } from "date-fns"
import { fr } from "date-fns/locale"
import { AlertCircle, Calendar, CheckCircle2, Clock, Plus, Shield, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { AnimalDetails, Vaccination } from "./types"

interface VaccinationsTabProps {
  animal: AnimalDetails
}

export const VaccinationsTab = ({ animal }: VaccinationsTabProps) => {
  // Données fictives en cas d'absence de vaccinations
  const vaccinations = animal.vaccinations || []

  // Trier les vaccinations (futures en premier, puis valides, puis expirées)
  const sortedVaccinations = [...vaccinations].sort((a, b) => {
    // Priorité aux statuts pour le tri
    const statusOrder = { upcoming: 0, valid: 1, expired: 2 }
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }

    // Puis par date (les plus récentes pour upcoming, les plus proches de l'expiration pour valid)
    if (a.status === "upcoming") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else {
      const aExpiry = a.expiryDate ? new Date(a.expiryDate) : new Date(a.date)
      const bExpiry = b.expiryDate ? new Date(b.expiryDate) : new Date(b.date)
      return aExpiry.getTime() - bExpiry.getTime()
    }
  })

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (!isValid(date)) return "Date invalide"

    return format(date, "d MMMM yyyy", { locale: fr })
  }

  // Style et texte pour les badges de statut
  const getStatusBadge = (status: Vaccination["status"]) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />À venir
          </Badge>
        )
      case "valid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Valide
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Expiré
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-medium">Carnet de vaccination</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Historique et planification des vaccins pour {animal.name}
          </p>
        </div>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un vaccin
        </Button>
      </div>

      {/* Résumé du statut vaccinal */}
      <Card className="overflow-hidden border bg-card">
        <div className="bg-muted/50 p-4 flex items-center gap-4 border-b">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">Statut des vaccinations</h4>
            <p className="text-sm text-muted-foreground">
              {vaccinations.filter(v => v.status === "valid").length === 0
                ? "Aucun vaccin valide actuellement"
                : `${vaccinations.filter(v => v.status === "valid").length} vaccins valides`}
              {vaccinations.filter(v => v.status === "upcoming").length > 0 &&
                ` · ${vaccinations.filter(v => v.status === "upcoming").length} à venir`}
              {vaccinations.filter(v => v.status === "expired").length > 0 &&
                ` · ${vaccinations.filter(v => v.status === "expired").length} expirés`}
            </p>
          </div>
        </div>

        <CardContent className="p-0">
          {vaccinations.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Aucun vaccin enregistré pour cet animal</p>
              <Button className="mt-4" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier vaccin
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {sortedVaccinations.map(vaccination => (
                <div
                  key={vaccination.id}
                  className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center ${
                        vaccination.status === "valid"
                          ? "bg-green-100 text-green-700"
                          : vaccination.status === "upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{vaccination.name}</h4>
                        {getStatusBadge(vaccination.status)}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {vaccination.status === "upcoming" ? "Prévu le " : "Effectué le "}
                            {formatDate(vaccination.date)}
                          </span>
                        </div>

                        {vaccination.expiryDate && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {isFuture(new Date(vaccination.expiryDate)) ? "Expire le " : "Expiré depuis le "}
                              {formatDate(vaccination.expiryDate)}
                            </span>
                          </div>
                        )}

                        {vaccination.veterinarian && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            <span>Dr. {vaccination.veterinarian}</span>
                          </div>
                        )}
                      </div>
                      {vaccination.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic">{vaccination.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-11 md:ml-0">
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                    {vaccination.status === "expired" && <Button size="sm">Renouveler</Button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommandations */}
      <div className="bg-muted/30 rounded-lg p-4 border">
        <h4 className="font-medium mb-2">Recommandations vétérinaires</h4>
        <p className="text-sm text-muted-foreground">
          Pour les {animal.species === "Chien" || animal.species === "Dog" ? "chiens" : "chats"}, il est recommandé de
          renouveler les vaccins principaux chaque année. Consultez votre vétérinaire pour établir un calendrier de
          vaccination adapté à {animal.name}.
        </p>
      </div>
    </div>
  )
}
