"use client"

import * as React from "react"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Loader2, PawPrint, UserRound } from "lucide-react"
import { Credenza, CredenzaContent } from "@/components/ui"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/src/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { getClients } from "@/src/actions/client.action"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"

interface PatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  type: z.enum(["Dog", "Cat", "Bird", "Horse", "NAC"], {
    message: "Veuillez sélectionner un type d'animal valide.",
  }),
  gender: z.enum(["Male", "Female"], {
    message: "Veuillez sélectionner un genre.",
  }),
  weight: z
    .string()
    .optional()
    .transform(v => (v === "" ? undefined : Number(v))),
  height: z
    .string()
    .optional()
    .transform(v => (v === "" ? undefined : Number(v))),
  breed: z.string().optional(),
  nacType: z.string().optional(),
  birthDate: z.date({
    required_error: "La date de naissance est requise.",
  }),
  description: z.string().optional(),
  ownerId: z.string({
    required_error: "Le propriétaire est requis.",
  }),
})

type FormValues = z.infer<typeof formSchema>

// Cette fonction simule l'appel à createPet de src/actions/pet.action.ts
const createPet = async (data: FormValues) => {
  // Simulation d'un appel API
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Patient créé:", data)
      resolve({ success: true, data })
    }, 1000)
  })
}

const PatientDialog = ({ open, onOpenChange }: PatientDialogProps) => {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const totalSteps = 3

  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const result = await getClients({ status: "Active" })
      if ("error" in result) {
        throw new Error(result.error)
      }
      return result.data || []
    },
    enabled: open,
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Dog",
      gender: "Male",
      breed: "",
      nacType: "",
      description: "",
    },
  })

  const selectedType = form.watch("type")
  const selectedGender = form.watch("gender")
  const selectedAnimalName = form.watch("name")
  const selectedOwner = form.watch("ownerId")

  const mutation = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      toast.success("Le patient a été créé avec succès")
      form.reset()
      onOpenChange(false)
      router.refresh()
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du patient")
    },
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Qui est le propriétaire ?"
      case 2:
        return "Informations de base"
      case 3:
        return "Caractéristiques physiques"
      default:
        return ""
    }
  }

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <UserRound className="h-5 w-5" />
      case 2:
        return <PawPrint className="h-5 w-5" />
      case 3:
        return <Clock className="h-5 w-5" />
      default:
        return null
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 bg-primary/10">
                <AvatarFallback>👤</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="ownerId"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoadingClients}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Sélectionnez le propriétaire" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingClients ? (
                            <div className="flex items-center justify-center p-4">
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              <span>Chargement...</span>
                            </div>
                          ) : clients && clients.length > 0 ? (
                            clients.map(client => (
                              <SelectItem key={client.id} value={client.id} className="py-3">
                                {client.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-4 text-center">Aucun client disponible</div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 bg-primary/10">
                <AvatarFallback>{selectedAnimalName ? selectedAnimalName.charAt(0).toUpperCase() : "🐾"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nom de l'animal" className="h-12 text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => {
                const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
                return (
                  <FormItem className="flex flex-col relative">
                    <Popover modal={true} open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 pl-3 text-left font-normal hover:bg-accent hover:text-accent-foreground",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Date de naissance</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                        style={{ zIndex: 9999 }}
                        forceMount
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          locale={fr}
                          className="rounded-md border shadow bg-popover"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Type d'animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dog">🐕 Chien</SelectItem>
                        <SelectItem value="Cat">🐈 Chat</SelectItem>
                        <SelectItem value="Bird">🦜 Oiseau</SelectItem>
                        <SelectItem value="Horse">🐎 Cheval</SelectItem>
                        <SelectItem value="NAC">🦔 NAC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">♂️ Mâle</SelectItem>
                        <SelectItem value="Female">♀️ Femelle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedType === "NAC" && (
              <FormField
                control={form.control}
                name="nacType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Type de NAC (ex: Lapin, Hamster...)" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Race" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Poids (kg)" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Taille (cm)" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Notes et observations"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedOwner
      case 2:
        return !!selectedAnimalName && !!selectedType && !!selectedGender
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Progress Bar */}
            <div className="px-6 pt-6">
              <Progress value={(step / totalSteps) * 100} className="h-2" />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  {getStepIcon(step)}
                  <h2 className="text-xl font-semibold">{getStepTitle(step)}</h2>
                </div>
                <div className="text-sm text-muted-foreground">
                  Étape {step} sur {totalSteps}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center px-6 py-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Button>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                {step === totalSteps ? (
                  <Button type="submit" disabled={mutation.isPending || !canProceed()} className="min-w-[100px]">
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création...
                      </>
                    ) : (
                      "Créer"
                    )}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep} disabled={!canProceed()} className="flex items-center gap-2">
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  )
}

export default PatientDialog
