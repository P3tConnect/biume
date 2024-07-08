"use server";
import { z } from "zod";
import { CreateDeseaseSchema } from "../db";
import { userAction } from "../lib";

export const getDeseases = async () => {};

export const creteDesease = userAction
  .schema(CreateDeseaseSchema)
  .action(async () => {});

export const updateDesease = userAction
  .schema(CreateDeseaseSchema)
  .action(async () => {});

export const deleteDesease = userAction
  .schema(z.string())
  .action(async () => {});
