"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, FileIcon, FileText, Loader2, UploadIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Credenza, CredenzaContent, CredenzaHeader, CredenzaTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/src/lib/utils"

interface DocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Définir le schéma du formulaire
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  description: z.string().optional(),
  date: z.date({
    required_error: "La date est requise.",
  }),
  category: z.enum(["medical", "identity", "invoice", "prescription", "other"], {
    required_error: "La catégorie est requise.",
  }),
  tags: z.string().optional(),
  file: z.any().optional(),
})

type FormValues = z.infer<typeof formSchema>

// Fonction simulée pour créer un document
const createDocument = async (data: FormValues) => {
  // Simulation d'un appel API
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Document créé:", data)
      resolve({ success: true, data })
    }, 1000)
  })
}

const DocumentDialog = ({ open, onOpenChange }: DocumentDialogProps) => {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "medical",
      tags: "",
    },
  })

  const selectedTitle = form.watch("title")
  const selectedCategory = form.watch("category")
  const selectedDate = form.watch("date")
  const selectedFile = form.watch("file")

  const mutation = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Le document a été créé avec succès")
      form.reset()
      onOpenChange(false)
      router.refresh()
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du document")
    },
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  // Fonction pour obtenir l'icône en fonction de la catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <FileText className="h-8 w-8" />
      case "identity":
        return <FileIcon className="h-8 w-8" />
      case "invoice":
        return <FileIcon className="h-8 w-8" />
      case "prescription":
        return <FileText className="h-8 w-8" />
      case "other":
        return <FileIcon className="h-8 w-8" />
      default:
        return <FileIcon className="h-8 w-8" />
    }
  }

  // Fonction pour obtenir le libellé de la catégorie en français
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "medical":
        return "Médical"
      case "identity":
        return "Identité"
      case "invoice":
        return "Facture"
      case "prescription":
        return "Ordonnance"
      case "other":
        return "Autre"
      default:
        return category
    }
  }

  // Fonction pour obtenir la couleur en fonction de la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical":
        return "text-blue-500"
      case "identity":
        return "text-green-500"
      case "invoice":
        return "text-amber-500"
      case "prescription":
        return "text-purple-500"
      case "other":
        return "text-slate-500"
      default:
        return "text-slate-500"
    }
  }

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <CredenzaHeader>
          <CredenzaTitle className="text-xl font-bold">Créer un nouveau document</CredenzaTitle>
        </CredenzaHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Prévisualisation du document */}
              <Card className="md:w-1/3 p-4 flex flex-col space-y-4 border-dashed">
                <div className="flex items-center justify-center">
                  <div
                    className={cn(
                      "h-24 w-24 rounded-md flex items-center justify-center",
                      selectedCategory === "medical"
                        ? "bg-blue-100"
                        : selectedCategory === "identity"
                          ? "bg-green-100"
                          : selectedCategory === "invoice"
                            ? "bg-amber-100"
                            : selectedCategory === "prescription"
                              ? "bg-purple-100"
                              : "bg-slate-100"
                    )}
                  >
                    <div
                      className={cn(
                        selectedCategory === "medical"
                          ? "text-blue-600"
                          : selectedCategory === "identity"
                            ? "text-green-600"
                            : selectedCategory === "invoice"
                              ? "text-amber-600"
                              : selectedCategory === "prescription"
                                ? "text-purple-600"
                                : "text-slate-600"
                      )}
                    >
                      {getCategoryIcon(selectedCategory)}
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-medium text-lg truncate">{selectedTitle || "Titre du document"}</h3>
                  <p className={cn("text-sm", getCategoryColor(selectedCategory))}>
                    {getCategoryLabel(selectedCategory)}
                  </p>
                </div>

                <div className="flex flex-col text-sm space-y-2 pt-2">
                  {selectedDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{format(selectedDate, "PPP", { locale: fr })}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileIcon className="h-4 w-4" />
                    <span>{selectedFile ? selectedFile.name || "Document" : "Aucun fichier"}</span>
                  </div>
                </div>
              </Card>

              {/* Formulaire à onglets */}
              <div className="md:w-2/3">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="info" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">Informations</span>
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <UploadIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Téléversement</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Onglet informations principales */}
                  <TabsContent value="info" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input placeholder="Titre du document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="medical">Médical</SelectItem>
                                <SelectItem value="identity">Identité</SelectItem>
                                <SelectItem value="invoice">Facture</SelectItem>
                                <SelectItem value="prescription">Ordonnance</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: fr })
                                    ) : (
                                      <span>Sélectionnez une date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (séparés par des virgules)</FormLabel>
                          <FormControl>
                            <Input placeholder="santé, patient, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Informations supplémentaires sur le document"
                              className="resize-none min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Onglet téléversement */}
                  <TabsContent value="upload" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fichier</FormLabel>
                          <FormControl>
                            <div className="border rounded-md p-4">
                              <div className="flex flex-col items-center justify-center py-4">
                                <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">Glissez-déposez un fichier ici ou</p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => {
                                    // Simuler un clic sur l'input file
                                    const input = document.createElement("input")
                                    input.type = "file"
                                    input.onchange = e => {
                                      const file = (e.target as HTMLInputElement).files?.[0]
                                      if (file) {
                                        field.onChange(file)
                                      }
                                    }
                                    input.click()
                                  }}
                                >
                                  Sélectionnez un fichier
                                </Button>
                              </div>
                              {field.value && (
                                <div className="mt-4 p-2 border rounded bg-gray-50 flex items-center">
                                  <FileIcon className="h-5 w-5 mr-2" />
                                  <span className="text-sm truncate">{field.value.name}</span>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={mutation.isPending} className="min-w-28">
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer le document"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  )
}

export default DocumentDialog
