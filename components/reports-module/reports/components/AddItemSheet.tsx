"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { NewReportItem } from "./types"

interface AddItemSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  newItem: NewReportItem
  setNewItem: (item: NewReportItem) => void
  onAdd: () => void
}

export function AddItemSheet({ isOpen, onOpenChange, newItem, setNewItem, onAdd }: AddItemSheetProps) {
  const updateNewItem = (field: keyof NewReportItem, value: string) => {
    setNewItem({ ...newItem, [field]: value })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un élément</SheetTitle>
          <SheetDescription>
            Choisissez le type d&apos;élément et ajoutez votre contenu.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="item-type">Type d&apos;élément</Label>
            <RadioGroup
              defaultValue="observation"
              value={newItem.type}
              onValueChange={value => updateNewItem("type", value as NewReportItem["type"])}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="observation" id="observation" />
                <Label htmlFor="observation" className="text-blue-500 font-medium">Observation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intervention" id="intervention" />
                <Label htmlFor="intervention" className="text-green-500 font-medium">Intervention réalisée</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recommendation" id="recommendation" />
                <Label htmlFor="recommendation" className="text-amber-500 font-medium">Recommandation</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              value={newItem.content}
              onChange={e => updateNewItem("content", e.target.value)}
              placeholder="Décrivez votre observation, intervention ou recommandation..."
              rows={8}
              className="resize-none"
            />
          </div>
        </div>

        <SheetFooter>
          <Button onClick={onAdd} disabled={!newItem.content.trim()}>
            Ajouter
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 