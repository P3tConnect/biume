"use client";

import {
  Button,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
  Form,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStepper } from "../../hooks/useStepper";
import { useStore } from "@/src/hooks";
import { CreateUserSchema } from "@/src/db";

const ClientInformationForm = () => {
  const stepperStore = useStore(useStepper, (state) => state);

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      image: "",
      lastname: "",
      firstname: "",
      birthday: new Date(),
      phoneNumber: "",
      sexe: "MALE",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
  });

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  type="text"
                  placeholder="image"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Nom"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Prénom"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value?.toISOString().split("T")[0]}
                    onChange={(e) => {
                      const value = new Date(e.target.value);
                      if (value instanceof Date && !isNaN(value.getTime())) {
                        field.onChange(value);
                      }
                    }}
                    type="date"
                    placeholder="Date de naissance"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexe"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Date de naissance</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre sexe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Masculin</SelectItem>
                    <SelectItem value="FEMALE">Féminin</SelectItem>
                    <SelectItem value="OTHERS">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="tel"
                    placeholder="Téléphone"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Ville"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Adresse (ex: 32 rue de la tour)"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="number"
                    placeholder="Code postal (ex: 75001)"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-end justify-end">
          <Button type="submit" variant="default">
            Étape suivante
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientInformationForm;
