"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Trash2, FileText, Eye, Save } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { toast } from "sonner"

interface PrescriptionUploaderProps {
  orgId: string
}

export function PrescriptionUploader({ orgId }: PrescriptionUploaderProps) {
  // const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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

      // Préremplit le titre avec le nom du fichier sans l'extension
      const fileName = file.name.replace(/\.[^/.]+$/, "")
      setTitle(fileName)
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

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Importer une ordonnance</CardTitle>
          <CardDescription>Téléchargez un fichier PDF contenant une ordonnance existante</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedFile ? (
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">Déposez votre ordonnance ici</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">Format PDF uniquement</p>
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
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-red-500 mr-2" />
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {previewUrl && (
                <div className="text-center">
                  <Button variant="outline" size="sm" asChild>
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser le PDF
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 mt-6">
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

            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Notes ou informations supplémentaires..."
                rows={4}
              />
            </div>

            <Button
              className="w-full mt-4"
              onClick={handleSavePrescription}
              disabled={!selectedFile || !title || !selectedPetId}
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer l'ordonnance
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prévisualisation</CardTitle>
          <CardDescription>Aperçu de l'ordonnance avant enregistrement</CardDescription>
        </CardHeader>
        <CardContent>
          {previewUrl ? (
            <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden">
              <iframe src={previewUrl} className="w-full h-full" title="Prévisualisation de l'ordonnance" />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Aucun aperçu disponible.
                <br />
                Veuillez sélectionner un fichier PDF.
              </p>
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
