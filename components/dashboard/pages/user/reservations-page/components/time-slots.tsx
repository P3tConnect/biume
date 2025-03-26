"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface TimeSlot {
  id: string
  time: string
  isAvailable: boolean
}

interface TimeSlotsProps {
  selectedDate: Date
  slots: TimeSlot[]
  onSelectSlot: (slotId: string) => void
  onDateChange: (date: Date) => void
  selectedSlotId?: string
}

export function TimeSlots({ selectedDate, slots, onSelectSlot, onDateChange, selectedSlotId }: TimeSlotsProps) {
  // Générer les 7 prochains jours
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Créneaux disponibles</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() - 7)
                onDateChange(newDate)
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() + 7)
                onDateChange(newDate)
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
          {nextDays.map(date => (
            <Button
              key={date.toISOString()}
              variant={date.toDateString() === selectedDate.toDateString() ? "default" : "outline"}
              className="flex-shrink-0"
              onClick={() => onDateChange(date)}
            >
              <div className="text-center">
                <div className="text-xs font-medium">{format(date, "EEE", { locale: fr })}</div>
                <div className="text-lg font-semibold">{format(date, "d", { locale: fr })}</div>
                <div className="text-xs">{format(date, "MMM", { locale: fr })}</div>
              </div>
            </Button>
          ))}
        </div>

        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {slots.map(slot => (
              <Button
                key={slot.id}
                variant={selectedSlotId === slot.id ? "default" : "outline"}
                className="w-full"
                disabled={!slot.isAvailable}
                onClick={() => onSelectSlot(slot.id)}
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
