import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { company } from "./company";

export const employeeCompany = pgTable("employee_company", {
  employeeId: text("employeeId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  companyId: text("companyId")
    .references(() => company.id, { onDelete: "cascade" })
    .notNull(),
});
