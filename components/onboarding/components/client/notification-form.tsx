"use client"

import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@/components/ui"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

import { clientOnBoardingSchema } from "../stepper-client"

const ClientNotificationForm = ({ form }: { form: UseFormReturn<z.infer<typeof clientOnBoardingSchema>> }) => {
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="smsNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-start items-start">
              <div className="flex flex-row items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={field?.value ?? undefined}
                    onCheckedChange={checked => field.onChange(checked === true)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-semibold">Choisir de recevoir les notifications par SMS</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-start items-start">
              <div className="flex flex-row items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={field?.value ?? undefined}
                    onCheckedChange={checked => field.onChange(checked === true)}
                  />
                </FormControl>
                <FormLabel className="text-sm font-semibold">Choisir de recevoir les notifications par email</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default ClientNotificationForm
