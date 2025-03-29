import { CalendarIcon, Clock, Tag, Type } from "lucide-react"
import React, { useEffect, useState } from "react"

import {
  Button,
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui"
import { Event } from "@/src/lib"
import { checkTimeOverlap, convertTo24Hour } from "@/src/lib/dateUtils"

interface EventModalClientProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: Event) => void
  onDelete: (event: Event) => void
  selectedDate: Date
  editingEvent: Event | null
  existingEvents: Event[]
}

const EventModalClient = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  editingEvent,
  existingEvents,
}: EventModalClientProps) => {
  const [title, setTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [startPeriod, setStartPeriod] = useState("AM")
  const [endTime, setEndTime] = useState("")
  const [endPeriod, setEndPeriod] = useState("AM")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<Event["category"]>("other")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingEvent) {
      const startDate = new Date(editingEvent.startTime)
      const endDate = new Date(editingEvent.endTime)

      setTitle(editingEvent.title)
      setStartTime(formatTimeForInput(startDate))
      setStartPeriod(startDate.getHours() >= 12 ? "PM" : "AM")
      setEndTime(formatTimeForInput(endDate))
      setEndPeriod(endDate.getHours() >= 12 ? "PM" : "AM")
      setDescription(editingEvent.description || "")
      setCategory(editingEvent.category)
    } else {
      setTitle("")
      setStartTime("09:00")
      setStartPeriod("AM")
      setEndTime("10:00")
      setEndPeriod("AM")
      setDescription("")
      setCategory("other")
    }
    setError(null)
  }, [editingEvent, selectedDate])

  const formatTimeForInput = (date: Date): string => {
    return date
      .toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      .slice(0, 5)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert times to minutes since midnight for comparison
    const startMinutes = convertTo24Hour(startTime, startPeriod)
    const endMinutes = convertTo24Hour(endTime, endPeriod)

    // Handle next day scenarios
    let adjustedEndMinutes = endMinutes
    if (endMinutes < startMinutes) {
      adjustedEndMinutes += 24 * 60 // Add 24 hours worth of minutes
    }

    // Check for invalid time ranges
    if (adjustedEndMinutes <= startMinutes) {
      setError("L'heure de fin doit être après l'heure de début")
      return
    }

    // Check for very short events (less than 30 minutes)
    if (adjustedEndMinutes - startMinutes < 30) {
      setError("Les rendez-vous doivent durer au moins 30 minutes")
      return
    }

    // Check for very long events (more than 24 hours)
    if (adjustedEndMinutes - startMinutes > 24 * 60) {
      setError("Les rendez-vous ne peuvent pas durer plus de 24 heures")
      return
    }

    const newStartTime = new Date(selectedDate)
    const [startHours, startMins] = startTime.split(":").map(Number)
    let adjustedStartHours = startHours
    if (startPeriod === "PM" && startHours !== 12) {
      adjustedStartHours += 12
    } else if (startPeriod === "AM" && startHours === 12) {
      adjustedStartHours = 0
    }
    newStartTime.setHours(adjustedStartHours, startMins)

    const newEndTime = new Date(selectedDate)
    const [endHours, endMins] = endTime.split(":").map(Number)
    let adjustedEndHours = endHours
    if (endPeriod === "PM" && endHours !== 12) {
      adjustedEndHours += 12
    } else if (endPeriod === "AM" && endHours === 12) {
      adjustedEndHours = 0
    }

    // If end time is earlier than start time, it's meant for the next day
    if (adjustedEndHours < adjustedStartHours || (adjustedEndHours === adjustedStartHours && endMins < startMins)) {
      newEndTime.setDate(newEndTime.getDate() + 1)
    }
    newEndTime.setHours(adjustedEndHours, endMins)

    // Check for overlapping events
    const isOverlapping = existingEvents.some(existingEvent => {
      if (editingEvent && existingEvent.id === editingEvent.id) return false
      return checkTimeOverlap(
        convertTo24Hour(startTime, startPeriod),
        convertTo24Hour(endTime, endPeriod),
        convertTo24Hour(
          new Date(existingEvent.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          ""
        ),
        convertTo24Hour(
          new Date(existingEvent.endTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          ""
        )
      )
    })

    if (isOverlapping) {
      setError("Ce rendez-vous chevauche un rendez-vous existant. Veuillez choisir un autre horaire.")
      return
    }

    const event: Event = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString(),
      description,
      category,
    }
    onSave(event)
    onClose()
  }

  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>{editingEvent ? "Modifier le rendez-vous" : "Ajouter un rendez-vous"}</CredenzaTitle>
        </CredenzaHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {error && <div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Intitulé du rendez-vous
            </Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required className="col-span-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Heure de début
              </Label>
              <div className="flex gap-2">
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Select value={startPeriod} onValueChange={setStartPeriod}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Heure de fin
              </Label>
              <div className="flex gap-2">
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Select value={endPeriod} onValueChange={setEndPeriod}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Catégorie
            </Label>
            <Select value={category} onValueChange={value => setCategory(value as Event["category"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Travail</SelectItem>
                <SelectItem value="personal">Personnel</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="health">Santé</SelectItem>
                <SelectItem value="hobbies">Loisirs</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </form>
        <CredenzaFooter className="flex gap-2 justify-between">
          {editingEvent && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onDelete(editingEvent)
                onClose()
              }}
            >
              Supprimer
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="button" onClick={handleSubmit}>
              {editingEvent ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default EventModalClient
