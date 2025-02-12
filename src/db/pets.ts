import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { appointments } from './appointments';
import { createInsertSchema } from 'drizzle-zod';
import { petsDeseases } from './petsDeseases';
import { z } from 'zod';
import { petsAllergies } from './petsAllergies';
import { petsIntolerences } from './petsIntolerences';
import { user } from './user';

export const petType = pgEnum('petType', [
  'Dog',
  'Cat',
  'Bird',
  'Horse',
  'NAC',
]);

export const petGender = pgEnum('petGender', ['Male', 'Female']);

export const pets = pgTable('pets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  type: petType('type').default('Dog').notNull(),
  gender: petGender('gender').notNull().default('Male'),
  breed: text('breed'),
  nacType: text('nacType'),
  image: text('image'),
  birthDate: timestamp('birthDate', { mode: 'date' }).notNull(),
  furColor: text('furColor'),
  eyeColor: text('eyeColor'),
  description: text('description'),
  weight: integer('weight'),
  height: integer('height'),
  ownerId: text('ownerId').references(() => user.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updatedAt'),
});

export const petsRelations = relations(pets, ({ one, many }) => ({
  appointments: many(appointments),
  deseases: many(petsDeseases),
  allergies: many(petsAllergies),
  intolerences: many(petsIntolerences),
  owner: one(user, {
    fields: [pets.ownerId],
    references: [user.id],
  }),
}));

export type Pet = typeof pets.$inferSelect;
export type CreatePet = typeof pets.$inferInsert;
export const PetTypeEnum = z.enum(petType.enumValues);

export const CreatePetSchema = createInsertSchema(pets);
