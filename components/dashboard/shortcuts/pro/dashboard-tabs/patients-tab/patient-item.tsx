"use client"

import { Cat, Dog, Calendar } from "lucide-react"
import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Pet } from "@/src/db"

export type ProPatient = {
  id: string
  name: string
  type: "Dog" | "Cat" | "Bird" | "Horse" | "NAC"
  weight: number
  height: number
  description: string | null
  image: string | null
  appointments: Array<{
    id: string
    status: "CONFIRMED"
  }>
}

interface PatientItemProps {
  patient: Pet
  onClick?: () => void
}

export const PatientItem = ({ patient, onClick }: PatientItemProps) => {
  const animalIcon =
    patient.type === "Cat" ? <Cat className="h-5 w-5" /> : patient.type === "Dog" ? <Dog className="h-5 w-5" /> : null

  return (
    <Card
      onClick={onClick}
      className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rotate-12 bg-primary/5 rounded-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="relative p-5">
        <div className="flex items-start gap-5">
          {/* Image avec overlay */}
          <div className="relative">
            <div className="relative h-20 w-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl z-10" />
              {patient.image ? (
                <Image
                  src={patient.image}
                  alt={patient.name}
                  fill
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-accent rounded-xl">{animalIcon}</div>
              )}
            </div>
            {/* Badge flottant */}
            <div className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-lg ring-2 ring-border group-hover:ring-primary/20 transition-all">
              {animalIcon}
            </div>
          </div>

          {/* Informations */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-lg font-semibold truncate pr-4 group-hover:text-primary transition-colors">
                {patient.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                <Calendar className="h-3.5 w-3.5" />
                <span>{patient.appointments.length}</span>
              </div>
            </div>

            <div className="inline-flex items-center rounded-full bg-accent/50 px-3 py-0.5 text-xs">
              <span className="font-medium">{patient.weight}kg</span>
              <span className="mx-1.5 h-0.5 w-0.5 rounded-full bg-foreground/30" />
              <span className="font-medium">{patient.height}cm</span>
            </div>

            {patient.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-1 group-hover:line-clamp-2 transition-all duration-300">
                {patient.description}
              </p>
            )}
          </div>
        </div>

        {/* Élément décoratif */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Card>
  )
}
