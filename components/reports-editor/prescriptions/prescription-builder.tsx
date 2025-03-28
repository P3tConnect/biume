"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, FileText, Eye, Save, X } from "lucide-react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"

interface PrescriptionItem {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

interface PrescriptionBuilderProps {
  orgId: string
}

export function PrescriptionBuilder({ orgId }: PrescriptionBuilderProps) {
  const [title, setTitle] = useState("Ordonnance du " + new Date().toLocaleDateString())
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [items, setItems] = useState<PrescriptionItem[]>([])
  const [notes, setNotes] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

  const handleAddItem = () => {
    const newItem: PrescriptionItem = {
      id: crypto.randomUUID(),
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
    }
    setItems([...items, newItem])
  }

  const handleUpdateItem = (id: string, field: keyof PrescriptionItem, value: string) => {
    setItems(items.map(item => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSavePrescription = () => {
    // Ici on appellerait une server action pour sauvegarder l'ordonnance
    console.log({
      title,
      petId: selectedPetId,
      items,
      notes,
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Créer une ordonnance</CardTitle>
          <CardDescription>Ajoutez des médicaments ou traitements à l&apos;ordonnance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de l'ordonnance*</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ordonnance du 01/01/2023"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet">Animal concerné*</Label>
            <div className="flex space-x-2">
              <Select value={selectedPetId} onValueChange={setSelectedPetId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner un animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet-1">Rex (Chien)</SelectItem>
                  <SelectItem value="pet-2">Félix (Chat)</SelectItem>
                  <SelectItem value="pet-3">Bunny (Lapin)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleOpenAnimalSelector}>
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <Label>Médicaments et traitements</Label>
              <Button variant="outline" size="sm" onClick={handleAddItem}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="border rounded-md p-8 flex flex-col items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  Aucun médicament ajouté.
                  <br />
                  Cliquez sur "Ajouter" pour commencer.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <Card key={item.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${item.id}`}>Nom du médicament*</Label>
                          <Input
                            id={`name-${item.id}`}
                            value={item.name}
                            onChange={e => handleUpdateItem(item.id, "name", e.target.value)}
                            placeholder="ex: Amoxicilline"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`dosage-${item.id}`}>Dosage*</Label>
                          <Input
                            id={`dosage-${item.id}`}
                            value={item.dosage}
                            onChange={e => handleUpdateItem(item.id, "dosage", e.target.value)}
                            placeholder="ex: 500mg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`frequency-${item.id}`}>Fréquence*</Label>
                          <Input
                            id={`frequency-${item.id}`}
                            value={item.frequency}
                            onChange={e => handleUpdateItem(item.id, "frequency", e.target.value)}
                            placeholder="ex: 2 fois par jour"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`duration-${item.id}`}>Durée*</Label>
                          <Input
                            id={`duration-${item.id}`}
                            value={item.duration}
                            onChange={e => handleUpdateItem(item.id, "duration", e.target.value)}
                            placeholder="ex: 7 jours"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`notes-${item.id}`}>Notes</Label>
                          <Textarea
                            id={`notes-${item.id}`}
                            value={item.notes || ""}
                            onChange={e => handleUpdateItem(item.id, "notes", e.target.value)}
                            placeholder="Instructions spécifiques..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="notes">Notes et recommandations générales</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Informations supplémentaires pour le propriétaire..."
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={togglePreviewMode}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Éditer" : "Aperçu"}
          </Button>
          <Button onClick={handleSavePrescription} disabled={!title || !selectedPetId || items.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Enregistrer l&apos;ordonnance
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prévisualisation</CardTitle>
          <CardDescription>Aperçu de l&apos;ordonnance avant enregistrement</CardDescription>
        </CardHeader>
        <CardContent>
          {previewMode ? (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md border shadow-sm">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold text-center">{title}</h2>
                <p className="text-sm text-center text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Patient</h3>
                <p>Nom: Rex (à remplacer par les données réelles)</p>
                <p>Espèce: Chien</p>
                <p>Propriétaire: Jean Dupont</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Prescription</h3>
                {items.length === 0 ? (
                  <p className="text-muted-foreground italic">Aucun médicament prescrit</p>
                ) : (
                  <ul className="space-y-4">
                    {items.map(item => (
                      <li key={item.id} className="border-b pb-2">
                        <div className="font-medium">{item.name || "[Nom du médicament]"}</div>
                        <div className="text-sm grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-muted-foreground">Dosage:</span> {item.dosage || "N/A"}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fréquence:</span> {item.frequency || "N/A"}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Durée:</span> {item.duration || "N/A"}
                          </div>
                        </div>
                        {item.notes && (
                          <div className="text-sm mt-1">
                            <span className="text-muted-foreground">Notes:</span> {item.notes}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {notes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Recommandations</h3>
                  <p className="text-sm whitespace-pre-line">{notes}</p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t text-right">
                <p className="font-medium">Dr. Vétérinaire</p>
                <p className="text-sm text-muted-foreground">Nom et signature</p>
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-center">Cliquez sur "Aperçu" pour voir l&apos;ordonnance.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modale de sélection d'animal */}
      {selectedPetId && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}
    </div>
  )
}
