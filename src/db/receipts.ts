import { pgTable } from "drizzle-orm/pg-core";

export const receipts = pgTable("receipts", {});

export type Receipt = typeof receipts.$inferSelect;
export type CreateReceipt = typeof receipts.$inferInsert;
