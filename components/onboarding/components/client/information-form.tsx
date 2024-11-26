"use client";

import {
  Button,
  Form,
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
import { CreateUserSchema } from "@/src/db/user";

const ClientInformationForm = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      birthday: "",
      city: "",
      zipcode: "",
      address: "",
      profilImage: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Nom" required />
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
                  <Input {...field} type="text" placeholder="Prénom" required />
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
                    {...field}
                    type="date"
                    placeholder="Date de naissance"
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
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
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
                  <Input {...field} type="text" placeholder="Ville" required />
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
                    {...field}
                    type="text"
                    placeholder="Adresse"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Code postal"
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
