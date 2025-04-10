"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUp, Image, Trash2 } from "lucide-react"

interface ImagesTabProps {
  previewUrls: string[]
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
}

export function ImagesTab({ previewUrls, onFileChange, onRemoveFile }: ImagesTabProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="p-3 border-b">
        <h2 className="font-medium">Schémas et images</h2>
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        <div className="bg-background/30 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center border-2 border-dashed mb-4">
          <Image className="h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">Importez vos schémas et images</h3>
          <p className="text-sm text-muted-foreground text-center mb-3">
            PNG, JPG ou GIF jusqu&apos;à 10 MB
          </p>
          <Button variant="secondary" className="relative bg-background/50">
            <Input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={onFileChange}
            />
            <FileUp className="h-4 w-4 mr-2" />
            Sélectionner des fichiers
          </Button>
        </div>

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative group rounded-xl overflow-hidden shadow-lg">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemoveFile(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
} 