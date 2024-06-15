DO $$ BEGIN
 CREATE TYPE "public"."plan" AS ENUM('BASIC', 'PREMIUM', 'ULTIMATE', 'NONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_options" (
	"sessionId" text,
	"optionId" text
);
--> statement-breakpoint
ALTER TABLE "alerts" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "alerts_types" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.530';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.527';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.481';--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company_documents" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.532';--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.521';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "plan" SET DATA TYPE plan;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "plan" SET DEFAULT 'NONE';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.542';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.524';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.546';--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.526';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.495';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.505';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.508';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.547';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 16:27:55.527';--> statement-breakpoint
ALTER TABLE "progression" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_options" ADD CONSTRAINT "session_options_sessionId_pro_session_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."pro_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_options" ADD CONSTRAINT "session_options_optionId_options_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
