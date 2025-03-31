"use client"

import { Button } from "@/components/ui/button"
import { FileText, X } from "lucide-react"

interface PrescriptionItem {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

interface PrescriptionPreviewProps {
  isOpen: boolean
  onClose: () => void
  title: string
  items: PrescriptionItem[]
  notes: string
}

export function PrescriptionPreview({
  isOpen,
  onClose,
  title,
  items,
  notes
}: PrescriptionPreviewProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-6 bg-background rounded-lg shadow-lg border overflow-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-lg font-medium">Aperçu de l'ordonnance</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/10">
              <h3 className="font-semibold mb-2">Patient</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Nom:</span> Rex
                </div>
                <div>
                  <span className="text-muted-foreground">Espèce:</span> Chien
                </div>
                <div>
                  <span className="text-muted-foreground">Date de naissance:</span> 01/01/2020
                </div>
                <div>
                  <span className="text-muted-foreground">Propriétaire:</span> Jean Dupont
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 pb-1 border-b">Prescription</h3>
              {items.length === 0 ? (
                <p className="text-muted-foreground italic">Aucun médicament prescrit</p>
              ) : (
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item.id} className="p-4 border rounded-lg">
                      <div className="font-medium text-lg mb-2">{item.name}</div>
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-xs text-muted-foreground mb-1">Dosage</div>
                          <div className="font-medium">{item.dosage}</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-xs text-muted-foreground mb-1">Fréquence</div>
                          <div className="font-medium">{item.frequency}</div>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <div className="text-xs text-muted-foreground mb-1">Durée</div>
                          <div className="font-medium">{item.duration}</div>
                        </div>
                      </div>
                      {item.notes && (
                        <div className="text-sm mt-3 p-3 bg-muted/10 rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">Instructions spécifiques</div>
                          {item.notes}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {notes && (
              <div className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-semibold mb-2">Recommandations générales</h3>
                <p className="whitespace-pre-line">{notes}</p>
              </div>
            )}

            <div className="mt-8 pt-4 border-t flex items-end justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Cachet de l'établissement</div>
                <div className="h-20 w-40 border rounded-md flex items-center justify-center text-muted-foreground text-xs">
                  Cachet
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Signature du vétérinaire</div>
                <p className="font-medium">Dr. Vétérinaire</p>
                <div className="h-12 w-40 border-b mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 