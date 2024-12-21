"use client";

import {
  Button,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useStore } from "@/src/hooks";
import { CreateUserSchema } from "@/src/db";

const ClientInformationForm = () => {
  // const stepperStore = useStore(useStepperClient, (state) => state);

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      image: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {});

  return (
    <form {...form} onSubmit={onSubmit} className="space-y-4">
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

      {/* <div className="flex flex-row gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  type="text"
                  placeholder="France"
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
      </div> */}

      <div className="w-full flex items-end justify-end">
        <Button type="submit" variant="default">
          Étape suivante
        </Button>
      </div>
    </form>
  );
};

export default ClientInformationForm;
