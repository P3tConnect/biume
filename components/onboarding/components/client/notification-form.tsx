"use client";

import {
  Button,
  // Checkbox
} from "@/components/ui";
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
} from "@/components/ui/form";
import { CreateUserSchema } from "@/src/db/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ClientNotificationForm = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      // smsNotification: false,
      // emailNotification: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("Form data:", data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* <FormField
          control={form.control}
          name="smsNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-3">
              <FormControl>
                <Checkbox {...field} checked={field.value} />
              </FormControl>
              <FormLabel className="text-sm font-semibold">
                Choisir de recevoir les notifications par SMS
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailNotification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-3">
              <FormControl>
                <Checkbox {...field} checked={field.value} />
              </FormControl>
              <FormLabel className="text-sm font-semibold">
                Choisir de recevoir les notifications par email
              </FormLabel>
            </FormItem>
          )}
        /> */}

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            Finaliser mon inscription
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientNotificationForm;
