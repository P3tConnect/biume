"use server";
import { z } from "zod";
import { CreateAddressSchema } from "../db/addresses";
import { userAction } from "../lib";

export const getAddresses = () => {};

export const createAddresses = userAction
  .schema(CreateAddressSchema)
  .action(async () => {});

export const updateAddress = userAction
  .schema(CreateAddressSchema)
  .action(async () => {});

export const deleteAddress = userAction
  .schema(z.string())
  .action(async () => {});
