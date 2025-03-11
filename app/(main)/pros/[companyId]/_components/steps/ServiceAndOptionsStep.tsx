"use client"

import { useState, useEffect } from "react"
import { Service, Option } from "@/src/db"
import { cn } from "@/src/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { getOptionsFromOrganization } from "@/src/actions/options.action"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, Check, Clock, Sparkles, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ServiceAndOptionsStepProps {
  services: Service[]
  selectedService: Service | null
  selectedOptions: Option[]
  onSelectService: (service: Service) => void
  onToggleOption: (option: Option) => void
}

export function ServiceAndOptionsStep({
  services,
  selectedService,
  selectedOptions,
  onSelectService,
  onToggleOption,
}: ServiceAndOptionsStepProps) {
  // Récupération des options
  const { data: options, isLoading } = useQuery({
    queryKey: ["options", selectedService?.id],
    queryFn: async () => {
      if (!selectedService?.id) return { data: [] }
      return getOptionsFromOrganization({
        organizationId: selectedService.organizationId || "",
      })
    },
    enabled: !!selectedService?.id,
  })

  const availableOptions = options?.data || []

  // Calculer le prix total des options sélectionnées
  const totalOptionPrice = selectedOptions.reduce((acc, option) => acc + (option.price || 0), 0)
  const totalPrice = (selectedService?.price || 0) + totalOptionPrice

  return (
    <div className="space-y-4">
      {/* Structure principale horizontale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne des Services */}
        <div>
          <h4 className="font-medium mb-3">Services disponibles</h4>
          <RadioGroup
            defaultValue={selectedService?.id}
            className="grid grid-cols-1 gap-2"
            onValueChange={value => {
              const service = services.find(s => s.id === value)
              if (service) onSelectService(service)
            }}
          >
            {services.map(service => (
              <div key={service.id} className="relative">
                <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                <Label
                  htmlFor={service.id}
                  className={cn(
                    "flex p-3 rounded-lg border cursor-pointer transition-all h-full",
                    "hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  )}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <span className="font-semibold text-primary">{service.price} €</span>
                    </div>

                    <div className="flex items-center mt-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">{service.duration} min</span>
                    </div>

                    {service.description && (
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{service.description}</p>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Colonne des Options */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Options disponibles</h4>
            {totalOptionPrice > 0 && <span className="text-sm text-primary">+{totalOptionPrice} €</span>}
          </div>

          {!selectedService ? (
            <div className="border rounded-md p-4 text-center bg-muted/30">
              <Info className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm">Veuillez d'abord sélectionner un service</p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center py-4 border rounded-md">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          ) : availableOptions.length > 0 ? (
            <ScrollArea className="max-h-[400px]">
              <div className="grid grid-cols-1 gap-2 pr-2">
                {availableOptions.map(option => {
                  const isSelected = selectedOptions.some(o => o.id === option.id)
                  return (
                    <div
                      key={option.id}
                      className={cn(
                        "flex p-3 border rounded-md cursor-pointer transition-all",
                        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/30"
                      )}
                      onClick={() => onToggleOption(option)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Checkbox id={option.id} checked={isSelected} className="mt-0.5 pointer-events-none" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <label htmlFor={option.id} className="font-medium text-sm cursor-pointer line-clamp-1">
                              {option.title || "Option"}
                            </label>
                            <div className="flex items-center gap-1">
                              {option.price > 0 && (
                                <span className="text-sm font-medium text-primary whitespace-nowrap">
                                  +{option.price}€
                                </span>
                              )}
                              {isSelected && (
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    onToggleOption(option)
                                  }}
                                  className="text-muted-foreground hover:text-foreground p-0.5"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                          {option.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{option.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="border rounded-md p-4 text-center text-muted-foreground text-sm">
              <Info className="h-5 w-5 mx-auto mb-2" />
              Aucune option disponible pour ce service
            </div>
          )}
        </div>
      </div>

      {/* Récapitulatif du prix */}
      {selectedService && (
        <div className="mt-4 pt-3 border-t flex justify-between items-center">
          <div>
            <div className="text-sm">
              {selectedService.name} <span className="text-muted-foreground">({selectedService.price} €)</span>
            </div>
            {selectedOptions.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {selectedOptions.length} option{selectedOptions.length > 1 ? "s" : ""} ({totalOptionPrice} €)
              </div>
            )}
          </div>
          <div className="text-lg font-semibold text-primary">{totalPrice} €</div>
        </div>
      )}
    </div>
  )
}
