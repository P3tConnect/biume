"use client";

import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CredenzaTrigger,
  Credenza,
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
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaContent,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReminderSchema, type Reminder } from "@/src/db/reminder";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, PencilIcon, TrashIcon } from "lucide-react";
import { z } from "zod";

const RemindersPageComponent = () => {
  const [reminders, setReminders] = React.useState<Reminder[]>([]);
  const [selectedReminder, setSelectedReminder] =
    React.useState<Reminder | null>(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const form = useForm<z.infer<typeof CreateReminderSchema>>({
    resolver: zodResolver(CreateReminderSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "other",
      dueDate: new Date(),
    },
  });

  const handleEdit = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setIsEditMode(true);
  };

  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Mes Rappels
        </CardTitle>
        <Credenza>
          <CredenzaTrigger asChild>
            <Button>Nouveau Rappel</Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>
                {isEditMode ? "Modifier le rappel" : "Créer un rappel"}
              </CredenzaTitle>
              <CredenzaDescription>
                {isEditMode
                  ? "Modifiez les informations du rappel ci-dessous"
                  : "Remplissez les informations du rappel ci-dessous"}
              </CredenzaDescription>
            </CredenzaHeader>
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input className="text-base" {...field} />
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
                          className="text-base"
                          {...field}
                          value={field.value ?? ""}
                        />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="appointment">
                            Rendez-vous
                          </SelectItem>
                          <SelectItem value="followup">Suivi</SelectItem>
                          <SelectItem value="vaccination">
                            Vaccination
                          </SelectItem>
                          <SelectItem value="medication">Médication</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
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
                          className="text-base"
                          type="datetime-local"
                          {...field}
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0] +
                                "T" +
                                field.value
                                  .toISOString()
                                  .split("T")[1]
                                  .split(".")[0]
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  // disabled={
                  //   createStatus === "executing" || updateStatus === "executing"
                  // }
                >
                  {isEditMode ? "Mettre à jour" : "Créer"}
                </Button>
              </form>
            </Form>
          </CredenzaContent>
        </Credenza>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{reminder.title}</h3>
                {reminder.description && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {reminder.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {format(new Date(reminder.dueDate), "PPP", { locale: fr })}
                  </span>
                  <span className="capitalize">{reminder.type}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      reminder.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : reminder.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {reminder.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                  // onClick={() => handleDelete(reminder.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {reminders.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucun rappel pour le moment
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RemindersPageComponent;
