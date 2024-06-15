CREATE TABLE IF NOT EXISTS "company_documents" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "progression" (

);
--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.596';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.606';--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.619';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.632';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.634';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.636';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.605';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.641';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.643';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.644';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.645';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 09:06:06.611';--> statement-breakpoint
ALTER TABLE "employee_company" ADD CONSTRAINT "employee_company_companyId_employeeId_pk" PRIMARY KEY("companyId","employeeId");--> statement-breakpoint
ALTER TABLE "estimate_options" ADD CONSTRAINT "estimate_options_estimateId_optionId_pk" PRIMARY KEY("estimateId","optionId");