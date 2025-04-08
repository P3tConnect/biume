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
  Separator,
} from "@/components/ui"
import { createOrganization } from "@/src/actions/organization.action"
import { cn } from "@/src/lib/utils"
import { proInformationsSchema } from "../../types/onboarding-schemas"

const InformationsForm = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof proInformationsSchema>>({
    resolver: zodResolver(proInformationsSchema),
    defaultValues: {
      name: "",
      email: "",
      logo: "", // On garde le champ pour la compatibilité avec le schéma
      description: "",
      companyType: "OTHER",
      website: "",
      facebook: "",
      instagram: "",
    },
  })

  const { control, handleSubmit, reset, getValues } = form

  console.log(getValues(), "values")

  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      setIsLoading(false)
      toast.success("Entreprise créée avec succès!")
      nextStep()
      reset()
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onError: error => {
      toast.error(error.message)
      setIsLoading(false)
    },
  })

  const onSubmit = handleSubmit(async data => {
    await mutateAsync(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="flex-1 p-6 flex flex-col gap-8 overflow-y-auto">
          {/* Informations de base */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Informations de base</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Nom de votre entreprise</FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Biume Inc."
                          {...field}
                          value={field.value ?? ""}
                          className={cn("h-10 text-base", form.formState.errors.name && "border-destructive")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email de contact</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contact@biume.com"
                        {...field}
                        value={field.value ?? ""}
                        className={cn("h-10 text-base", form.formState.errors.email && "border-destructive")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
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
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Description de votre entreprise</FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        "min-h-[120px] resize-none text-base",
                        form.formState.errors.description && "border-destructive"
                      )}
                      placeholder="Décrivez votre activité, vos services et ce qui vous rend unique..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          {/* Présence en ligne */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Présence en ligne</h2>

            <div className="space-y-5">
              <FormField
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Site web</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.votresite.com"
                        {...field}
                        value={field.value ?? ""}
                        className={cn("h-10", form.formState.errors.website && "border-destructive")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Facebook</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://www.facebook.com/votrepage"
                          {...field}
                          value={field.value ?? ""}
                          className={cn("h-10", form.formState.errors.facebook && "border-destructive")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Instagram</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://www.instagram.com/votrecompte"
                          {...field}
                          value={field.value ?? ""}
                          className={cn("h-10", form.formState.errors.instagram && "border-destructive")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="flex justify-between items-center p-6 border-t bg-muted/30">
          <Button disabled={isLoading} type="button" variant="outline" className="rounded-xl" onClick={previousStep}>
            ← Précédent
          </Button>
          <div className="flex gap-3">
            <Button
              disabled={isLoading}
              type="button"
              variant="ghost"
              onClick={nextStep}
              className="text-muted-foreground"
            >
              Passer
            </Button>
            <Button disabled={isLoading} type="submit" className="rounded-xl px-6">
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
        </div>
      </form>
    </Form>
  )
}

export default InformationsForm
