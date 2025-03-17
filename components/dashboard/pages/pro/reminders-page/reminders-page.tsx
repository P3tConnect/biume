"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, PencilIcon, TrashIcon, PlusIcon, FilterIcon, ClockIcon, StethoscopeIcon, SyringeIcon, PillIcon, MoreHorizontalIcon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { z } from "zod"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui"
import { CreateReminderSchema, type Reminder } from "@/src/db/reminder"
import { createReminderAction, deleteReminderAction, getRemindersAction, updateReminderAction } from "@/src/actions/reminder.action"

const ReminderTypeIcon = ({ type }: { type: Reminder["type"] }) => {
  switch (type) {
    case "appointment":
      return <StethoscopeIcon className="w-4 h-4" />
    case "followup":
      return <ClockIcon className="w-4 h-4" />
    case "vaccination":
      return <SyringeIcon className="w-4 h-4" />
    case "medication":
      return <PillIcon className="w-4 h-4" />
    default:
      return <MoreHorizontalIcon className="w-4 h-4" />
  }
}

const ReminderStatusBadge = ({ status }: { status: Reminder["status"] }) => {
  const variants: Record<NonNullable<Reminder["status"]>, string> = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  }

  return (
    <Badge variant="outline" className={status ? variants[status] : undefined}>
      {status === "completed" ? "Terminé" : status === "cancelled" ? "Annulé" : "En attente"}
    </Badge>
  )
}

const RemindersPageComponent = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedReminder, setSelectedReminder] = React.useState<Reminder | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<"all" | NonNullable<Reminder["status"]>>("all")
  const [typeFilter, setTypeFilter] = React.useState<"all" | NonNullable<Reminder["type"]>>("all")
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()

  const { data: remindersData } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getRemindersAction({}),
  })

  const reminders = (remindersData ?? []) as Reminder[]

  const filteredReminders = React.useMemo(() => {
    return reminders.filter(reminder => {
      const matchesStatus = statusFilter === "all" || reminder.status === statusFilter
      const matchesType = typeFilter === "all" || reminder.type === typeFilter
      return matchesStatus && matchesType
    })
  }, [reminders, statusFilter, typeFilter])

  const form = useForm<z.infer<typeof CreateReminderSchema>>({
    resolver: zodResolver(CreateReminderSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "other",
      dueDate: new Date(),
    },
  })

  const { mutate: createReminder, isPending: isCreating } = useMutation({
    mutationFn: createReminderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
      toast.success("Rappel créé avec succès")
      setIsOpen(false)
      form.reset()
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du rappel")
    },
  })

  const { mutate: updateReminder, isPending: isUpdating } = useMutation({
    mutationFn: updateReminderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
      toast.success("Rappel mis à jour avec succès")
      setIsOpen(false)
      setSelectedReminder(null)
      form.reset()
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour du rappel")
    },
  })

  const { mutate: deleteReminder, isPending: isDeleting } = useMutation({
    mutationFn: deleteReminderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] })
      toast.success("Rappel supprimé avec succès")
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression du rappel")
    },
  })

  const handleEdit = (reminder: Reminder) => {
    setSelectedReminder(reminder)
    form.reset({
      title: reminder.title,
      description: reminder.description ?? "",
      type: reminder.type,
      dueDate: new Date(reminder.dueDate),
      status: reminder.status,
    })
    setIsOpen(true)
  }

  const onSubmit = (values: z.infer<typeof CreateReminderSchema>) => {
    if (selectedReminder) {
      updateReminder({ id: selectedReminder.id, data: values })
    } else {
      createReminder(values)
    }
  }

  return (
    <>
      {shouldShowAlert && organizationId && <SubscriptionNonPayedAlert organizationId={organizationId} />}
      <Card className="w-full h-full rounded-2xl">
        <CardHeader className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mes Rappels</CardTitle>
            <Credenza open={isOpen} onOpenChange={setIsOpen}>
              <CredenzaTrigger asChild>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Nouveau Rappel
                </Button>
              </CredenzaTrigger>
              <CredenzaContent>
                <CredenzaHeader>
                  <CredenzaTitle>{selectedReminder ? "Modifier le rappel" : "Créer un rappel"}</CredenzaTitle>
                  <CredenzaDescription>
                    {selectedReminder
                      ? "Modifiez les informations du rappel ci-dessous"
                      : "Remplissez les informations du rappel ci-dessous"}
                  </CredenzaDescription>
                </CredenzaHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Textarea {...field} value={field.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ?? "other"}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="appointment">
                                <div className="flex items-center gap-2">
                                  <StethoscopeIcon className="w-4 h-4" />
                                  Rendez-vous
                                </div>
                              </SelectItem>
                              <SelectItem value="followup">
                                <div className="flex items-center gap-2">
                                  <ClockIcon className="w-4 h-4" />
                                  Suivi
                                </div>
                              </SelectItem>
                              <SelectItem value="vaccination">
                                <div className="flex items-center gap-2">
                                  <SyringeIcon className="w-4 h-4" />
                                  Vaccination
                                </div>
                              </SelectItem>
                              <SelectItem value="medication">
                                <div className="flex items-center gap-2">
                                  <PillIcon className="w-4 h-4" />
                                  Médication
                                </div>
                              </SelectItem>
                              <SelectItem value="other">
                                <div className="flex items-center gap-2">
                                  <MoreHorizontalIcon className="w-4 h-4" />
                                  Autre
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date d&apos;échéance</FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              {...field}
                              value={
                                field.value
                                  ? new Date(field.value).toISOString().split(".")[0]
                                  : ""
                              }
                              onChange={(e) => field.onChange(new Date(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {selectedReminder && (
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value ?? "pending"}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="completed">Terminé</SelectItem>
                                <SelectItem value="cancelled">Annulé</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <Button
                      type="submit"
                      disabled={isCreating || isUpdating}
                      className="w-full"
                    >
                      {selectedReminder ? "Mettre à jour" : "Créer"}
                    </Button>
                  </form>
                </Form>
              </CredenzaContent>
            </Credenza>
          </div>
          <div className="flex items-center justify-between">
            <Tabs value={statusFilter} onValueChange={(value: string) => setStatusFilter(value as typeof statusFilter)}>
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="completed">Terminés</TabsTrigger>
                <TabsTrigger value="cancelled">Annulés</TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filtrer par type
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                  Tous les types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("appointment")}>
                  <StethoscopeIcon className="w-4 h-4 mr-2" />
                  Rendez-vous
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("followup")}>
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Suivi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("vaccination")}>
                  <SyringeIcon className="w-4 h-4 mr-2" />
                  Vaccination
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("medication")}>
                  <PillIcon className="w-4 h-4 mr-2" />
                  Médication
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("other")}>
                  <MoreHorizontalIcon className="w-4 h-4 mr-2" />
                  Autre
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReminders.map((reminder: Reminder) => (
              <div
                key={reminder.id}
                className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <ReminderTypeIcon type={reminder.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold truncate">{reminder.title}</h3>
                      <ReminderStatusBadge status={reminder.status} />
                    </div>
                    {reminder.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{reminder.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {format(new Date(reminder.dueDate), "PPP", { locale: fr })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(reminder)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteReminder({ id: reminder.id })}
                    disabled={isDeleting}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredReminders.length === 0 && (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <div className="flex flex-col items-center gap-2">
                  <CalendarIcon className="w-12 h-12 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Aucun rappel</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {typeFilter !== "all" || statusFilter !== "all"
                      ? "Aucun rappel ne correspond aux filtres sélectionnés"
                      : "Commencez par créer votre premier rappel"}
                  </p>
                  {typeFilter === "all" && statusFilter === "all" && (
                    <Button onClick={() => setIsOpen(true)} className="mt-4">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Créer un rappel
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default RemindersPageComponent
