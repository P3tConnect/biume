"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getBiumeAIAppointments, getAppointmentsLocalizations } from "@/src/actions/biume-ai.action"
import { Organization } from "@/src/db/organization"
import { useMutation, useQuery } from "@tanstack/react-query"
import { format, parseISO } from "date-fns"
import { useState } from "react"
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from "@react-google-maps/api"
import { Bot, Clock, MapPin } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

// Type pour les créneaux optimisés
interface OptimizedSlot {
  time: string
  duration: number
  travelTimeFromPrevious: number
  location: {
    lat: number
    lng: number
    address: string
  }
}

export function BiumeAI({ organization, onSelectSlot }: {
  organization: Organization
  onSelectSlot: (slot: any) => void
}) {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  )
  const [optimizedSlots, setOptimizedSlots] = useState<OptimizedSlot[]>([])
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)

  // Charger l'API Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"]
  })

  // Récupérer les rendez-vous pour la date sélectionnée
  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ["biume-ai-appointments", organization.id, selectedDate],
    queryFn: () => getBiumeAIAppointments({
      companyId: organization.id,
      date: selectedDate
    }),
    enabled: !!organization.id && organization.onDemand
  })

  // Mutation pour calculer les optimisations
  const { mutate: optimizeRoute, isPending } = useMutation({
    mutationFn: async () => {
      if (!appointmentsData?.data) return null

      // Extraire les IDs des rendez-vous
      const appointmentIds = appointmentsData.data.atHomeAppointments.map((app: any) => app.id)
      return getAppointmentsLocalizations({
        companyId: organization.id,
        appointmentIds
      })
    },
    onSuccess: async (response) => {
      if (!response?.data || !isLoaded) return

      // Utiliser l'API de directions de Google Maps pour optimiser l'itinéraire
      const { appointments, availableSlots } = response.data

      try {
        // Créer le service de directions
        const directionsService = new google.maps.DirectionsService()

        // Construire les waypoints pour les destinations
        const waypoints = appointments.map((app: any) => ({
          location: new google.maps.LatLng(
            app.address?.lat || 0,
            app.address?.lng || 0
          ),
          stopover: true
        })).filter((wp: any) => wp.location.lat() !== 0 && wp.location.lng() !== 0)

        // Si nous avons suffisamment de points pour un itinéraire
        if (waypoints.length > 0) {
          const origin = new google.maps.LatLng(
            organization.address?.lat || 0,
            organization.address?.lng || 0
          )

          const result = await directionsService.route({
            origin,
            destination: origin, // Boucle pour revenir au point de départ
            waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
          })

          setDirectionsResponse(result)

          // Générer des créneaux optimisés en fonction de l'itinéraire
          const optimizedRoute = result.routes[0]
          const legs = optimizedRoute.legs

          // Créer des créneaux optimisés
          const slots: OptimizedSlot[] = []

          // Ajouter des créneaux en fonction des temps de trajet
          let currentTime = new Date()
          currentTime.setHours(9, 0, 0, 0) // Commencer à 9h

          legs.forEach((leg, index) => {
            const travelTime = leg.duration?.value || 0 // en secondes

            // Trouver un créneau disponible compatible
            const compatibleSlot = availableSlots.find((slot: any) => {
              const slotTime = parseISO(slot.start || "")
              return Math.abs(slotTime.getTime() - currentTime.getTime()) < 30 * 60 * 1000 // 30 minutes d'écart max
            })

            if (compatibleSlot && compatibleSlot.service) {
              slots.push({
                time: format(currentTime, "HH:mm"),
                duration: compatibleSlot.service.duration || 30,
                travelTimeFromPrevious: Math.round(travelTime / 60), // en minutes
                location: {
                  lat: leg.end_location.lat(),
                  lng: leg.end_location.lng(),
                  address: leg.end_address
                }
              })

              // Mettre à jour le temps pour le prochain slot
              currentTime = new Date(currentTime.getTime() + (compatibleSlot.service.duration || 30) * 60 * 1000 + travelTime * 1000)
            }
          })

          setOptimizedSlots(slots)

          if (slots.length === 0) {
            toast.info("Aucun créneau optimisé disponible pour cette date")
          }
        } else {
          toast.info("Pas assez de rendez-vous pour optimiser un itinéraire")
        }
      } catch (error) {
        console.error("Erreur lors de l'optimisation:", error)
        toast.error("Impossible d'optimiser l'itinéraire")
      }
    },
    onError: (error) => {
      console.error("Erreur:", error)
      toast.error("Une erreur est survenue lors de l'optimisation")
    }
  })

  // Si l'organisation n'a pas activé onDemand, ne pas afficher le composant
  if (!organization.onDemand) {
    return null
  }

  return (
    <Card className="mt-6 bg-blue-50/50 border-blue-100">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Assistant Biume IA</CardTitle>
        </div>
        <CardDescription>
          Optimisation intelligente de vos rendez-vous à domicile
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-[125px] w-full rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        ) : appointmentsData?.data ? (
          <>
            {/* Carte Google Maps */}
            {isLoaded && (
              <div className="h-[200px] w-full rounded-md overflow-hidden relative">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{
                    lat: organization.address?.lat || 48.8566,
                    lng: organization.address?.lng || 2.3522
                  }}
                  zoom={10}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true
                  }}
                >
                  {directionsResponse && (
                    <DirectionsRenderer
                      directions={directionsResponse}
                      options={{
                        polylineOptions: {
                          strokeColor: "#4f46e5",
                          strokeWeight: 5
                        },
                        markerOptions: {
                          zIndex: 100
                        }
                      }}
                    />
                  )}

                  {!directionsResponse && (
                    <Marker
                      position={{
                        lat: organization.address?.lat || 48.8566,
                        lng: organization.address?.lng || 2.3522
                      }}
                    />
                  )}
                </GoogleMap>
              </div>
            )}

            {/* Créneaux optimisés */}
            {optimizedSlots.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Créneaux optimisés suggérés :</h3>
                <div className="space-y-2">
                  {optimizedSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="p-3 border border-blue-200 rounded-md hover:bg-blue-100/50 cursor-pointer transition-colors"
                      onClick={() => onSelectSlot(slot)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          <span className="text-sm font-medium">{slot.time}</span>
                          <Badge variant="outline" className="bg-blue-100/50 text-xs">
                            {slot.duration} min
                          </Badge>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {slot.travelTimeFromPrevious} min de trajet
                        </Badge>
                      </div>
                      <div className="flex items-start gap-1.5 mt-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {slot.location.address}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : directionsResponse ? (
              <p className="text-sm text-muted-foreground">
                Aucun créneau optimisé disponible pour cette date.
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Activez l'optimisation intelligente pour vos rendez-vous à domicile.
          </p>
        )}
      </CardContent>

      <CardFooter>
        {appointmentsData?.data && !directionsResponse ? (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => optimizeRoute()}
            disabled={isPending}
          >
            {isPending ? "Optimisation en cours..." : "Optimiser mon parcours"}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
