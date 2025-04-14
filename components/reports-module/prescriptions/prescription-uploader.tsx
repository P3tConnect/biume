"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Trash2, FileText, Eye, Save, AlignLeft, ChevronLeftIcon, EyeIcon, SaveIcon } from "lucide-react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { toast } from "sonner"

interface PrescriptionUploaderProps {
  orgId: string
}

// Mock pet data structure (replace with actual data fetching later)
const mockPets = [
  { id: "pet-1", name: "Rex", species: "Chien" },
  { id: "pet-2", name: "Félix", species: "Chat" },
  { id: "pet-3", name: "Bunny", species: "Lapin" },
]

export function PrescriptionUploader({ orgId }: PrescriptionUploaderProps) {
  const router = useRouter()
  const [title, setTitle] = useState("Ordonnance du " + new Date().toLocaleDateString())
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"upload" | "notes">("upload")

  // Find the selected pet from mock data
  const selectedPet = mockPets.find(pet => pet.id === selectedPetId)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Format non supporté", {
          description: "Veuillez sélectionner un fichier PDF.",
        })
        return
      }

      setSelectedFile(file)
      // Créer une URL pour prévisualiser le PDF
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)

      // Préremplit le titre s'il n'a pas été modifié
      if (title === "Ordonnance du " + new Date().toLocaleDateString()) {
        const fileName = file.name.replace(/\.[^/.]+$/, "")
        setTitle(fileName)
      }
    }
  }

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleSavePrescription = async () => {
    if (!selectedFile || !title || !selectedPetId) {
      toast.error("Informations manquantes", {
        description: "Veuillez remplir tous les champs obligatoires.",
      })
      return
    }

    // Simuler l'envoi du fichier et l'enregistrement de l'ordonnance
    toast.success("Ordonnance enregistrée", {
      description: "L'ordonnance a été ajoutée au dossier de l'animal.",
    })

    // Normalement ici on ferait un appel à une fonction server action pour enregistrer
    // l'ordonnance dans la base de données et le fichier dans un stockage comme UploadThing
  }

  // Added function to handle back navigation
  const handleGoBack = () => {
    // Add confirmation logic if needed (e.g., if file is uploaded but not saved)
    router.back()
  }

  // Determine if the save button should be enabled
  const canSave = !!selectedFile && !!title && !!selectedPetId

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* New Header Structure */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <div>
            {/* Make title editable here, maybe via an input or a dedicated button */}
            {/* For now, just display it. Will need state management for title editing */}
            <h1 className="text-xl font-semibold">{title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {selectedPet ? (
                <button onClick={() => setIsAnimalCredenzaOpen(true)} className="hover:underline">
                  {selectedPet.name} ({selectedPet.species})
                </button>
              ) : (
                <button onClick={() => setIsAnimalCredenzaOpen(true)} className="text-primary hover:underline">
                  Sélectionner un animal
                </button>
              )}
              {/* Maybe add appointment info later if needed */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)} disabled={!selectedFile}>
            <EyeIcon className="h-4 w-4 mr-1" />
            Aperçu
          </Button>
          <Button onClick={handleSavePrescription} disabled={!canSave}>
            <SaveIcon className="h-4 w-4 mr-1" />
            Enregistrer
          </Button>
        </div>
      </div>
      {/* End New Header Structure */}

      {/* Barre d'onglets */}
      <div className="px-4 pt-4 pb-0 flex border-b">
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "upload" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("upload")}
        >
          <FileText className="h-4 w-4 mr-2" />
          Téléchargement
        </button>
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === "notes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          onClick={() => setActiveTab("notes")}
        >
          <AlignLeft className="h-4 w-4 mr-2" />
          Notes
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-4 h-[calc(100vh-104px)] overflow-auto">
        {activeTab === "upload" ? (
          <div className="max-w-4xl mx-auto">
            {!selectedFile ? (
              <div className="border-2 border-dashed rounded-md p-10 flex flex-col items-center justify-center h-64">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2 text-lg">Déposez votre ordonnance ici</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">Format PDF uniquement</p>
                <Button variant="secondary" className="relative">
                  <Input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <FileUp className="h-4 w-4 mr-2" />
                  Sélectionner un fichier
                </Button>
              </div>
            ) : (
              <div className="border rounded-md p-6 bg-muted/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <h3 className="font-medium">{selectedFile.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} Ko • PDF
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
                {previewUrl && (
                  <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden mb-4">
                    <iframe src={previewUrl} className="w-full h-full" title="Prévisualisation de l'ordonnance" />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">
              Notes supplémentaires (optionnel)
            </h3>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ajoutez des notes ou des recommandations à cette ordonnance..."
              className="min-h-[300px]"
            />
          </div>
        )}
      </div>

      {/* Modale de prévisualisation */}
      {showPreview && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-6 bg-background rounded-lg shadow-lg border overflow-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Aperçu de l'ordonnance</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                <Trash2 className="h-4 w-4" />
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

                {previewUrl && (
                  <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
                    <iframe src={previewUrl} className="w-full h-full" title="Prévisualisation de l'ordonnance" />
                  </div>
                )}

                {description && (
                  <div className="p-4 border rounded-lg bg-muted/10">
                    <h3 className="font-semibold mb-2">Recommandations générales</h3>
                    <p className="whitespace-pre-line">{description}</p>
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
      )}

      {/* Modale de sélection d'animal */}
      {selectedPetId && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}
    </div>
  )
}
