"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { ExceptionalMoveFormValues } from "../types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const DetailsStep = () => {
  const { control } = useFormContext<ExceptionalMoveFormValues>()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Détails du déplacement</h3>
        </div>
        <div className="space-y-4">
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse précise</FormLabel>
                <FormControl>
                  <Input placeholder="123 rue du Cabinet" {...field} />
                </FormControl>
                <FormDescription>L'adresse exacte où vous serez disponible</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raison du déplacement</FormLabel>
                <FormControl>
                  <Input placeholder="Visite à domicile, urgence..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes additionnelles</FormLabel>
                <FormControl>
                  <Textarea placeholder="Informations complémentaires..." className="resize-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
