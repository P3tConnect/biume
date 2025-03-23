"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { ExceptionalMoveFormValues } from "../types"

export const LocationStep = () => {
  const { control } = useFormContext<ExceptionalMoveFormValues>()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Navigation className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Zone de déplacement</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville centrale</FormLabel>
                <FormControl>
                  <Input placeholder="Paris, Lyon, Marseille..." {...field} />
                </FormControl>
                <FormDescription>La ville autour de laquelle vous vous déplacez</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="radius"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rayon d'action (km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    min={1}
                    max={100}
                  />
                </FormControl>
                <FormDescription>Distance maximale de déplacement</FormDescription>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
