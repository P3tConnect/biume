"use client"

import { useState } from "react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { ItemsTab } from "./components/ItemsTab"
import { ImagesTab } from "./components/ImagesTab"
import { NotesTab } from "./components/NotesTab"
import { ReportPreview } from "./components/ReportPreview"
import { ReportItem, NewReportItem, Observation } from "./components/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Check,
  ChevronLeftIcon,
  ClipboardIcon,
  EyeIcon,
  SaveIcon,
  PawPrintIcon,
  ImageIcon,
  CalendarIcon,
  AlertCircleIcon
} from "lucide-react"
import { useRouter } from "next/navigation"

interface SimpleReportBuilderProps {
  orgId: string
}

export function SimpleReportBuilder({ orgId }: SimpleReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu de visite du " + new Date().toLocaleDateString())
  const router = useRouter()
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [items, setItems] = useState<ReportItem[]>([])
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<"clinical" | "images" | "notes">("clinical")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [observations, setObservations] = useState<Observation[]>([])
  const [showExitConfirmDialog, setShowExitConfirmDialog] = useState(false)

  // État temporaire pour le nouvel élément
  const [newItem, setNewItem] = useState<NewReportItem>({
    type: "observation",
    content: ""
  })

  const handleAddItem = () => {
    if (!newItem.content) return

    const item: ReportItem = {
      id: crypto.randomUUID(),
      ...newItem
    }

    setItems([...items, item])

    // Réinitialiser le formulaire
    setNewItem({
      type: "observation",
      content: ""
    })

    // Fermer la modale
    setIsAddModalOpen(false)
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      const validFiles = newFiles.filter(file => file.type.startsWith("image/"))

      if (validFiles.length !== newFiles.length) {
        // Gestion d'erreur: certains fichiers ne sont pas des images
        console.error("Certains fichiers sélectionnés ne sont pas des images")
      }

      const fileUrls = validFiles.map(file => URL.createObjectURL(file))

      setSelectedFiles(prev => [...prev, ...validFiles])
      setPreviewUrls(prev => [...prev, ...fileUrls])
    }
  }

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveReport = () => {
    // Ici on appellerait une server action pour sauvegarder le rapport
    console.log({
      title,
      petId: selectedPetId,
      items,
      notes,
      images: selectedFiles.map(file => file.name),
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const updateNewItem = (field: keyof NewReportItem, value: string) => {
    setNewItem({ ...newItem, [field]: value })
  }

  const handleGoBack = () => {
    if (items.length > 0 || notes.trim().length > 0 || selectedFiles.length > 0) {
      setShowExitConfirmDialog(true)
    } else {
      navigateBack()
    }
  }

  const navigateBack = () => {
    router.push(`/dashboard/${orgId}/reports`)
  }

  const selectedPet = [
    { id: "pet-1", name: "Rex", species: "Chien" },
    { id: "pet-2", name: "Félix", species: "Chat" },
    { id: "pet-3", name: "Bunny", species: "Lapin" },
  ].find(pet => pet.id === selectedPetId)

  const handleTabChange = (tab: "clinical" | "images" | "notes") => {
    setActiveTab(tab)
  }

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden">
      {/* En-tête amélioré avec Card */}
      <Card className="mx-6 mt-6 mb-4 border shadow">
        <CardHeader className="pb-0 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleGoBack} className="rounded-full hover:bg-primary/10">
                  <ChevronLeftIcon className="h-5 w-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Retour au tableau de bord</TooltipContent>
            </Tooltip>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl">Rédaction de rapport simple</CardTitle>
              <CardDescription>
                Créez un rapport rapide avec observations, images et notes
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Aperçu
                </Button>
              </TooltipTrigger>
              <TooltipContent>Prévisualiser le rapport</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={handleSaveReport}
                  disabled={!title || !selectedPetId || items.length === 0}
                >
                  <SaveIcon className="h-4 w-4 mr-1" />
                  Enregistrer
                </Button>
              </TooltipTrigger>
              <TooltipContent>Enregistrer le rapport</TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ClipboardIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="text-xl font-semibold border-none bg-transparent focus-visible:ring-1 focus-visible:ring-offset-0 p-0 h-auto"
                placeholder="Titre du rapport..."
              />
              <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                {selectedPet ? (
                  <>
                    <PawPrintIcon className="h-3.5 w-3.5" />
                    <span>{selectedPet.name} ({selectedPet.species})</span>
                  </>
                ) : (
                  <span className="text-muted-foreground/80 italic flex items-center gap-2">
                    <PawPrintIcon className="h-3.5 w-3.5" />
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handleOpenAnimalSelector}>
                      Sélectionner un animal
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal avec onglets */}
      <div className="flex-1 overflow-hidden flex flex-col px-6 pb-6">
        {/* Interface principale */}
        <Card className="flex-1 overflow-hidden shadow border">
          <Tabs
            defaultValue="clinical"
            value={activeTab}
            onValueChange={(val) => handleTabChange(val as "clinical" | "images" | "notes")}
            className="h-full flex flex-col"
          >
            <div className="px-6 py-3 bg-white border-b">
              <TabsList className="grid grid-cols-3 max-w-2xl mx-auto">
                <TabsTrigger value="clinical" className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  Observations
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-1.5">
                  <ClipboardIcon className="h-4 w-4" />
                  Notes
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="clinical" className="h-full mt-0 border-none">
                <div className="h-full flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Observations cliniques</h2>
                    <Button onClick={() => setIsAddModalOpen(true)} className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Ajouter un élément
                    </Button>
                  </div>
                  <ItemsTab
                    items={items}
                    onRemoveItem={handleRemoveItem}
                    onOpenAddSheet={() => setIsAddModalOpen(true)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="h-full mt-0 border-none">
                <div className="h-full flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">Images et documents</h2>
                  <ImagesTab
                    previewUrls={previewUrls}
                    onFileChange={handleFileChange}
                    onRemoveFile={handleRemoveFile}
                  />
                </div>
              </TabsContent>

              <TabsContent value="notes" className="h-full mt-0 border-none">
                <div className="h-full flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">Notes complémentaires</h2>
                  <NotesTab
                    notes={notes}
                    setNotes={setNotes}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>

      {/* Dialogue de confirmation pour quitter */}
      <Dialog open={showExitConfirmDialog} onOpenChange={setShowExitConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircleIcon className="h-5 w-5 text-amber-500" />
              Retour au tableau de bord
            </DialogTitle>
            <DialogDescription>
              Vous avez des modifications non enregistrées. Si vous retournez au tableau de bord, toutes vos modifications seront perdues.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowExitConfirmDialog(false)}>
              Continuer l'édition
            </Button>
            <Button variant="destructive" onClick={navigateBack}>
              Retourner au tableau de bord
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue modal pour ajouter un élément */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Ajouter un élément
            </DialogTitle>
            <DialogDescription>
              Choisissez le type d'élément et ajoutez votre contenu.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Type d'élément</Label>
              <RadioGroup
                defaultValue="observation"
                value={newItem.type}
                onValueChange={value => updateNewItem("type", value as NewReportItem["type"])}
                className="grid grid-cols-1 gap-2"
              >
                <Label
                  htmlFor="observation"
                  className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value="observation" id="observation" />
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-100 p-1">
                      <FileText className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span className="font-medium text-foreground">Observation</span>
                  </div>
                </Label>

                <Label
                  htmlFor="intervention"
                  className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value="intervention" id="intervention" />
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <span className="font-medium text-foreground">Intervention réalisée</span>
                  </div>
                </Label>

                <Label
                  htmlFor="recommendation"
                  className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value="recommendation" id="recommendation" />
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-amber-100 p-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <span className="font-medium text-foreground">Recommandation</span>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-foreground/80">Contenu</Label>
              <Textarea
                id="content"
                value={newItem.content}
                onChange={e => updateNewItem("content", e.target.value)}
                placeholder="Décrivez votre observation, intervention ou recommandation..."
                rows={5}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddItem} disabled={!newItem.content.trim()} className="gap-1">
              <Check className="h-4 w-4" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modale de prévisualisation */}
      <ReportPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        observations={observations}
        notes={notes}
        images={previewUrls}
      />

      {/* Modale de sélection d'animal */}
      {isAnimalCredenzaOpen && (
        <AnimalCredenza
          isOpen={isAnimalCredenzaOpen}
          onOpenChange={setIsAnimalCredenzaOpen}
          petId={selectedPetId}
        />
      )}
    </div>
  )
}
