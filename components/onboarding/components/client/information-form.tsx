"use client";

import { Button, Form, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller } from "react-hook-form";
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
      // sexe: "",
      city: "",
      zipcode: "",
      address: "",
      profilImage: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-row gap-4 mb-4">
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Nom" required />
              )}
            />
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Prénom" required />
              )}
            />
          </div>
          <div className="flex flex-row gap-4 mb-4">
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <Input
                  name="birthday"
                  value={field.value || ""}
                  type="date"
                  placeholder="Date de naissance"
                  required
                />
              )}
            />
            {/* <Controller
              name="sexe"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value || ""}
                  type="text"
                  placeholder="Sexe"
                  required
                />
              )}
            /> */}
          </div>
          <div className="flex flex-row gap-4 mb-4">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value || ""}
                  type="tel"
                  placeholder="Téléphone"
                  required
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value || ""}
                  type="text"
                  placeholder="Ville"
                  required
                />
              )}
            />
          </div>
          <div className="flex flex-row gap-4 mb-4">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value || ""}
                  type="text"
                  placeholder="Adresse"
                  required
                />
              )}
            />
            <Controller
              name="zipcode"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value || ""}
                  type="number"
                  placeholder="Code postal"
                  required
                />
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
    </>
  );
};

export default ClientInformationForm;
