import { InferSelectModel, relations } from "drizzle-orm"
import { PetDocument, petDocuments } from "./petDocuments"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"

import { User } from "better-auth"
import { Appointment, appointments } from "./appointments"
import { user } from "./user"
import { z } from "zod"
import { PetAppointment, petAppointments } from "./pet_appointments"
import { MedicalRecordAccess, medicalRecordAccess } from "./medicalRecordAccess"

export const petType = pgEnum("petType", ["Dog", "Cat", "Bird", "Horse", "Cow", "NAC"])

export const petGender = pgEnum("petGender", ["Male", "Female"])

export const pets = pgTable("pets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: petType("type").default("Dog").notNull(),
  weight: integer("weight").notNull(),
  height: integer("height").notNull(),
  description: text("description"),
  ownerId: text("ownerId").references(() => user.id, {
    onDelete: "cascade",
  }),
  breed: text("breed").notNull(),
  image: text("image"),
  chippedNumber: integer("chippedNumber"),
  gender: petGender("gender").notNull().default("Male"),
  nacType: text("nacType"),
  birthDate: timestamp("birthDate", { mode: "date" }).notNull(),
  deseases: text("deseases").array(),
  allergies: text("allergies").array(),
  intolerences: text("intolerences").array(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const petsRelations = relations(pets, ({ many, one }) => ({
  appointments: many(petAppointments),
  owner: one(user, {
    fields: [pets.ownerId],
    references: [user.id],
  }),
  documents: many(petDocuments),
  medicalRecordAccess: many(medicalRecordAccess),
}))

export type Pet = InferSelectModel<typeof pets> & {
  owner: User
  documents: PetDocument[]
  appointments: PetAppointment[]
  medicalRecordAccess: MedicalRecordAccess[]
}

export type CreatePet = typeof pets.$inferInsert
export const PetTypeEnum = z.enum(petType.enumValues)

export const CreatePetSchema = createInsertSchema(pets)
export const PetSchema = createSelectSchema(pets)
