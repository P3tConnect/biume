"use client"

import { Button, Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui"
import React, { useState } from "react"
import { Tag, TagInput } from "emblor"
import { getPetById, updatePetIntolerences } from "@/src/actions"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Pet } from "@/src/db/pets"
import { petSchema } from "../schema/pet-schema"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { usePetContext } from "../context/pet-context"
import { useSession } from "@/src/lib/auth-client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Liste des intolérances communes chez les animaux
const commonIntolerances = [
  { id: "1", text: "Gluten" },
  { id: "2", text: "Lactose" },
  { id: "3", text: "Soja" },
  { id: "4", text: "Œufs" },
  { id: "5", text: "Poisson" },
]

interface InformationsPetIntolerancesFormProps {
  nextStep: () => void
  previousStep: () => void
  isPending: boolean
  petData?: Pet | null
  isUpdate?: boolean
}

const InformationsPetIntolerancesForm = ({
  nextStep,
  previousStep,
  isPending,
  petData: initialPetData,
  isUpdate = false,
}: InformationsPetIntolerancesFormProps) => {
  const { petId } = usePetContext()
  const { data: session } = useSession()
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>(
    (initialPetData?.intolerences as string[]) || []
  )

  const { data: fetchedPetData, isLoading } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => getPetById({ petId: petId as string }),
    enabled: !!petId && isUpdate && !initialPetData,
  })

  const petData = initialPetData || (fetchedPetData && "data" in fetchedPetData ? fetchedPetData.data : null)

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      intolerences: [],
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: updatePetIntolerences,
    onSuccess: () => {
      toast.success("Intolérances enregistrées avec succès!")
      nextStep()
    },
    onError: error => {
      toast.error(`Erreur lors de l'enregistrement des intolérances: ${error.message}`)
    },
  })

  const handleIntoleranceSelection = (intoleranceText: string) => {
    setSelectedIntolerances(current => {
      if (current.includes(intoleranceText)) {
        return current
      }
      return [...current, intoleranceText]
    })
  }

  const handleSubmit = async () => {
    if (!petId) {
      toast.error("Erreur : ID de l'animal non trouvé")
      return
    }

    if (!session) {
      toast.error("Erreur : Session non trouvée")
      return
    }

    await mutateAsync({
      intolerences: selectedIntolerances,
      petId: petId,
    })
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="intolerences"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sélectionnez les intolérances</FormLabel>
              <FormControl>
                <TagInput
                  tags={
                    selectedIntolerances.map((intolerance, index) => ({
                      id: index.toString(),
                      text: intolerance,
                    })) || []
                  }
                  setTags={newTagsOrSetter => {
                    const tagsArray = Array.isArray(newTagsOrSetter) ? newTagsOrSetter : newTagsOrSetter([])

                    const newIntolerances = tagsArray.map((tag: Tag) => tag.text)
                    setSelectedIntolerances(newIntolerances)
                  }}
                  placeholder="Ajouter une intolérance"
                  styleClasses={{
                    tagList: {
                      container: "gap-1",
                    },
                    input:
                      "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    tag: {
                      body: "text-black relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 dark:text-white",
                      closeButton:
                        "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                    },
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  inlineTags={false}
                  inputFieldPosition="top"
                />
              </FormControl>
              <div className="flex flex-wrap gap-1 mt-2">
                {commonIntolerances.map(intolerance => (
                  <Button
                    key={intolerance.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleIntoleranceSelection(intolerance.text)}
                    className="text-xs"
                  >
                    {intolerance.text}
                  </Button>
                ))}
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={previousStep} type="button">
            Retour
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Enregistrement..." : "Suivant"}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default InformationsPetIntolerancesForm
