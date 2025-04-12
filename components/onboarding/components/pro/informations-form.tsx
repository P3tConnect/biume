"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"
import { createOrganization } from "@/src/actions/organization.action"
import { cn } from "@/src/lib/utils"
import { proInformationsSchema } from "../../types/onboarding-schemas"

const InformationsForm = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("informations")

  const form = useForm<z.infer<typeof proInformationsSchema>>({
    resolver: zodResolver(proInformationsSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      companyType: "OTHER",
      website: "",
      facebook: "",
      instagram: "",
    },
  })

  const { control, handleSubmit, reset, formState, trigger } = form

  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      setIsLoading(false)
      toast.success("Entreprise créée avec succès!")
      nextStep()
      reset()
    },
    onMutate: (e: any) => {
      console.log(e, "e")
      setIsLoading(true)
    },
    onError: error => {
      console.log(error, "error")
      toast.error(error.message)
      setIsLoading(false)
    },
  })

  const onSubmit = handleSubmit(async data => {
    await mutateAsync(data)
  })

  const areRequiredFieldsValid = async () => {
    // Vérifier uniquement les champs obligatoires
    const result = await trigger(["name", "email", "description", "companyType"])
    return result
  }

  return (
    <div className="flex flex-col h-full">
      <Form {...form}>
        <form className="flex flex-col h-full">
          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="informations" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="informations">Informations</TabsTrigger>
                <TabsTrigger value="presence">Présence en ligne</TabsTrigger>
              </TabsList>

              {/* Onglet Informations */}
              <TabsContent value="informations" className="space-y-4">
                <h2 className="text-lg font-medium mb-4">Informations de base</h2>

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium">Nom de votre entreprise</FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Biume Inc."
                          {...field}
                          value={field.value ?? ""}
                          className={cn("h-10 text-base", formState.errors.name && "border-destructive")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium">Email de contact</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@biume.com"
                          {...field}
                          value={field.value ?? ""}
                          className={cn("h-10 text-base", formState.errors.email && "border-destructive")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="companyType"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium">Type d&apos;entreprise</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value ?? "NONE"}>
                        <FormControl>
                          <SelectTrigger className="h-10 text-base">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AUTO-ENTREPRENEUR">Auto-entrepreneur</SelectItem>
                          <SelectItem value="SARL">SARL</SelectItem>
                          <SelectItem value="SAS">SAS</SelectItem>
                          <SelectItem value="EIRL">EIRL</SelectItem>
                          <SelectItem value="SASU">SASU</SelectItem>
                          <SelectItem value="EURL">EURL</SelectItem>
                          <SelectItem value="OTHER">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium">Description de votre entreprise</FormLabel>
                      <FormControl>
                        <Textarea
                          className={cn("resize-none text-base", formState.errors.description && "border-destructive")}
                          placeholder="Décrivez votre activité, vos services et ce qui vous rend unique..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Onglet Présence en ligne */}
              <TabsContent value="presence" className="space-y-4">
                <h2 className="text-lg font-medium mb-4">Présence en ligne (optionnel)</h2>

                <FormField
                  control={control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium">Site web</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://www.votresite.com"
                          {...field}
                          value={field.value ?? ""}
                          className={cn("h-10", formState.errors.website && "border-destructive")}
                        />
                      </FormControl>
                      {formState.errors.website && (
                        <p className="text-xs text-destructive">Laissez vide ou entrez une URL valide</p>
                      )}
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-sm font-medium">Facebook</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://www.facebook.com/votrepage"
                            {...field}
                            value={field.value ?? ""}
                            className={cn("h-10", formState.errors.facebook && "border-destructive")}
                          />
                        </FormControl>
                        {formState.errors.facebook && (
                          <p className="text-xs text-destructive">Laissez vide ou entrez une URL valide</p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-sm font-medium">Instagram</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://www.instagram.com/votrecompte"
                            {...field}
                            value={field.value ?? ""}
                            className={cn("h-10", formState.errors.instagram && "border-destructive")}
                          />
                        </FormControl>
                        {formState.errors.instagram && (
                          <p className="text-xs text-destructive">Laissez vide ou entrez une URL valide</p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer fixe */}
          <div className="border-t border-border p-6 bg-background mt-auto">
            {activeTab === "informations" ? (
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={previousStep}
                  disabled={isLoading}
                >
                  ← Précédent
                </Button>

                <Button
                  type="button"
                  className="rounded-xl px-6"
                  onClick={async () => {
                    if (await areRequiredFieldsValid()) {
                      setActiveTab("presence")
                    } else {
                      // Mettre en valeur les erreurs
                      await trigger(["name", "email", "description", "companyType"])
                      toast.error("Veuillez compléter tous les champs obligatoires.")
                    }
                  }}
                >
                  Continuer →
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setActiveTab("informations")}
                >
                  ← Retour
                </Button>

                <Button
                  type="button"
                  className="rounded-xl px-6"
                  disabled={isLoading}
                  onClick={async () => {
                    // Vérifiez d'abord les champs obligatoires
                    const requiredFieldsValid = await areRequiredFieldsValid()

                    if (!requiredFieldsValid) {
                      toast.error("Les informations de base contiennent des erreurs.")
                      setActiveTab("informations")
                      return
                    }

                    // Les champs en ligne ne sont pas bloquants, on soumet directement
                    form.handleSubmit(data => {
                      mutateAsync(data)
                    })()
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>En cours...</span>
                    </>
                  ) : (
                    "Suivant →"
                  )}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default InformationsForm
