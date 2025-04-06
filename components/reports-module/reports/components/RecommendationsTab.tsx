"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, TrashIcon } from "lucide-react"

interface Recommendation {
  id: string
  content: string
}

interface RecommendationsTabProps {
  recommendations: Recommendation[]
  setRecommendations: (recommendations: Recommendation[]) => void
}

export function RecommendationsTab({ recommendations, setRecommendations }: RecommendationsTabProps) {
  const [newRecommendation, setNewRecommendation] = useState("")

  const handleAddRecommendation = () => {
    if (!newRecommendation.trim()) return

    const recommendation: Recommendation = {
      id: crypto.randomUUID(),
      content: newRecommendation.trim()
    }

    setRecommendations([...recommendations, recommendation])
    setNewRecommendation("")
  }

  const handleRemoveRecommendation = (id: string) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={newRecommendation}
          onChange={e => setNewRecommendation(e.target.value)}
          placeholder="Ajouter un conseil ou une recommandation..."
          className="flex-1"
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleAddRecommendation()
            }
          }}
        />
        <Button onClick={handleAddRecommendation} disabled={!newRecommendation.trim()}>
          <PlusIcon className="h-4 w-4 mr-1" />
          Ajouter
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {recommendations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md bg-muted/10">
            Aucun conseil ou recommandation à afficher. Ajoutez-en un à l'aide du champ ci-dessus.
          </div>
        ) : (
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={recommendation.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-md border border-muted/50">
                <span className="font-medium min-w-[24px]">{index + 1}.</span>
                <p className="flex-1">{recommendation.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRecommendation(recommendation.id)}
                  className="h-6 w-6 text-destructive hover:bg-destructive/10"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 