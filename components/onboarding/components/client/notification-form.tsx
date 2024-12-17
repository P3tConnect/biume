"use client";

import {
  Form,
  Button,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui";
import { CreateUserSchema } from "@/src/db/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

const ClientNotificationForm = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      smsNotification: false,
      emailNotification: false,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: z.infer<typeof CreateUserSchema>) => {
    console.log("Form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-2 items-start justify-center">
          <div className="flex flex-row items-center justify-center content-center text-center gap-3">
            <FormField
              control={form.control}
              name="smsNotification"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Checkbox name={field.name} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <h3>Choisir de recevoir les notifications par SMS</h3>
          </div>
          <div className="flex flex-row items-center justify-center content-center text-center gap-3">
            <FormField
              control={form.control}
              name="emailNotification"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Checkbox name={field.name} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <h3>Choisir de recevoir les notifications par email</h3>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <Button type="submit">Finaliser mon inscription</Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientNotificationForm;
