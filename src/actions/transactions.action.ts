"use server";

import { z } from "zod";
import { CreateTransactionSchema } from "../db";
import { userAction } from "../lib";

export const getTransactions = () => {};

export const createTransactions = userAction
  .schema(CreateTransactionSchema)
  .action(async () => {});

export const updateTransactions = userAction
  .schema(CreateTransactionSchema)
  .action(async () => {});

export const deleteTransaction = userAction
  .schema(z.string())
  .action(async () => {});
