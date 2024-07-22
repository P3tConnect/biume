"use server";

import { z } from "zod";
import { CreateObservationSchema } from "../db";
import { proAction } from "../lib/action";

export async function getObservations() {}

export const createObservation = proAction
  .schema(CreateObservationSchema)
  .action(async () => {});

export const updateObservation = proAction
  .schema(CreateObservationSchema)
  .action(async () => {});

export const deleteObservation = proAction
  .schema(z.string())
  .action(async () => {});
