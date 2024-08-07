"use server";

import { z } from "zod";
import { CreateObservationSchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getObservations = userAction.action(async () => {});

export const createObservation = proAction
  .schema(CreateObservationSchema)
  .action(async () => {});

export const updateObservation = proAction
  .schema(CreateObservationSchema)
  .action(async () => {});

export const deleteObservation = proAction
  .schema(z.string())
  .action(async () => {});
