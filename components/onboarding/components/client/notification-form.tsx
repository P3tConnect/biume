"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui";
import { CreateUserSchema } from "@/src/db/user";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ClientNotificationForm = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      smsNotification: false,
      emailNotification: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="smsNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-start items-start">
              <div className="flex flex-row items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={field?.value ?? undefined}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <FormLabel className="text-sm font-semibold">
                  Choisir de recevoir les notifications par SMS
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-start items-start">
              <div className="flex flex-row items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={field?.value ?? undefined}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <FormLabel className="text-sm font-semibold">
                  Choisir de recevoir les notifications par email
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ClientNotificationForm;
