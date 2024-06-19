"use server";

import { z } from "zod";
import { CreateObservationSchema } from "../db";
import { proAction } from "../utils/action";

export async function getObservations() {}

export const createObservation = proAction(
    CreateObservationSchema,
    async (params, _) => {},
);

export const updateObservation = proAction(
    CreateObservationSchema,
    async (params, _) => {},
);

export const deleteObservation = proAction(z.string(), async (params, _) => {});
