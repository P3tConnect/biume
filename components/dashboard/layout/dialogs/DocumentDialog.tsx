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
      <CredenzaContent className="sm:max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Panneau de prévisualisation */}
          <div className="md:w-1/3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8 flex flex-col justify-between border-r">
            <div className="space-y-6">
              <CredenzaHeader>
                <CredenzaTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Nouveau Document
                </CredenzaTitle>
              </CredenzaHeader>

              <div className="relative group">
                <div className={cn(
                  "absolute inset-0 rounded-2xl transition-all duration-300 group-hover:blur-sm",
                  selectedCategory === "medical" ? "bg-blue-100/50" :
                    selectedCategory === "identity" ? "bg-green-100/50" :
                      selectedCategory === "invoice" ? "bg-amber-100/50" :
                        selectedCategory === "prescription" ? "bg-purple-100/50" :
                          "bg-slate-100/50"
                )} />
                <Card className="relative h-[280px] border-none shadow-none bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 transition-transform duration-300 group-hover:scale-[0.98]">
                  <div className={cn(
                    "h-32 w-32 rounded-2xl flex items-center justify-center transition-colors duration-300",
                    selectedCategory === "medical" ? "bg-blue-100" :
                      selectedCategory === "identity" ? "bg-green-100" :
                        selectedCategory === "invoice" ? "bg-amber-100" :
                          selectedCategory === "prescription" ? "bg-purple-100" :
                            "bg-slate-100"
                  )}>
                    <div className={cn(
                      "transform transition-all duration-300 group-hover:scale-110",
                      selectedCategory === "medical" ? "text-blue-600" :
                        selectedCategory === "identity" ? "text-green-600" :
                          selectedCategory === "invoice" ? "text-amber-600" :
                            selectedCategory === "prescription" ? "text-purple-600" :
                              "text-slate-600"
                    )}>
                      {getCategoryIcon(selectedCategory)}
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="font-medium text-xl truncate max-w-[200px]">
                      {selectedTitle || "Titre du document"}
                    </h3>
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                      getCategoryColor(selectedCategory),
                      selectedCategory === "medical" ? "bg-blue-100/50" :
                        selectedCategory === "identity" ? "bg-green-100/50" :
                          selectedCategory === "invoice" ? "bg-amber-100/50" :
                            selectedCategory === "prescription" ? "bg-purple-100/50" :
                              "bg-slate-100/50"
                    )}>
                      {getCategoryLabel(selectedCategory)}
                    </span>
                  </div>

                  {(selectedDate || selectedFile) && (
                    <div className="flex flex-col items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-4">
                      {selectedDate && (
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{format(selectedDate, "PPP", { locale: fr })}</span>
                        </div>
                      )}
                      {selectedFile && (
                        <div className="flex items-center gap-2">
                          <FileIcon className="h-4 w-4" />
                          <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              <p className="italic">Prévisualisez votre document en temps réel pendant que vous le créez.</p>
            </div>
          </div>

          {/* Panneau du formulaire */}
          <div className="md:w-2/3 p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="info" className="flex items-center gap-2 py-3">
                      <FileText className="h-4 w-4" />
                      <span>Informations</span>
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2 py-3">
                      <UploadIcon className="h-4 w-4" />
                      <span>Fichier</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Titre</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Titre du document"
                              {...field}
                              className="h-12 text-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
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
                            <FormLabel className="text-base">Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "h-12 pl-3 text-left font-normal",
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
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
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
                          <FormLabel className="text-base">Tags</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Exemple: santé, patient, consultation"
                              {...field}
                              className="h-12"
                            />
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
                          <FormLabel className="text-base">Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ajoutez des détails sur votre document..."
                              className="resize-none min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="border-2 border-dashed rounded-xl p-8 transition-colors hover:border-slate-400 dark:hover:border-slate-500">
                              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                <div className="relative group">
                                  <div className="absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-tilt bg-gradient-to-r from-blue-600 to-purple-600"></div>
                                  <div className="relative">
                                    <UploadIcon className="h-16 w-16 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300" />
                                  </div>
                                </div>
                                <div className="text-center space-y-2">
                                  <p className="text-base text-slate-600 dark:text-slate-400">
                                    Glissez-déposez votre fichier ici ou
                                  </p>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="mt-2"
                                    onClick={() => {
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
                                    Parcourir les fichiers
                                  </Button>
                                </div>
                              </div>
                              {field.value && (
                                <div className="mt-6 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm">
                                  <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
                                      <FileIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                        {field.value.name}
                                      </p>
                                      <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {(field.value.size / 1024 / 1024).toFixed(2)} MB
                                      </p>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                                      onClick={() => field.onChange(null)}
                                    >
                                      Supprimer
                                    </Button>
                                  </div>
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

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="min-w-[120px]"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="min-w-[120px]"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création...
                      </>
                    ) : (
                      "Créer"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}

export default DocumentDialog
