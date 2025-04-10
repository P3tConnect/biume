"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Save } from "lucide-react"

interface HeaderProps {
  title: string
  setTitle: (title: string) => void
  selectedPetId: string
  setSelectedPetId: (id: string) => void
  onOpenAnimalSelector: () => void
  onOpenPreview: () => void
  onSave: () => void
  canSave: boolean
}

export function Header({
  title,
  setTitle,
  selectedPetId,
  setSelectedPetId,
  onOpenAnimalSelector,
  onOpenPreview,
  onSave,
  canSave
}: HeaderProps) {
  return (
    <div className="border-b py-1 px-2 bg-background">
      <div className="flex items-center justify-between">
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="text-md font-medium border-none bg-transparent focus-visible:ring-0 px-0 h-7 max-w-md"
          placeholder="Titre de l'ordonnance..."
        />
        <div className="flex items-center gap-1">
          <Select value={selectedPetId} onValueChange={setSelectedPetId}>
            <SelectTrigger className="h-7 text-sm w-[160px]">
              <SelectValue placeholder="Sélectionner un animal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pet-1">Rex (Chien)</SelectItem>
              <SelectItem value="pet-2">Félix (Chat)</SelectItem>
              <SelectItem value="pet-3">Bunny (Lapin)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onOpenAnimalSelector}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={onOpenPreview}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" className="h-7 w-7" onClick={onSave} disabled={!canSave}>
            <Save className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
} 