ALTER TYPE "role" ADD VALUE 'GROOMER';--> statement-breakpoint
ALTER TYPE "role" ADD VALUE 'MASSAGER';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-17 19:07:01.675',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "observations" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-17 19:07:01.677',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipts" (

);
--> statement-breakpoint
ALTER TABLE "intolerences" DROP CONSTRAINT "intolerences_ownerId_company_id_fk";
--> statement-breakpoint
ALTER TABLE "pro_session" DROP CONSTRAINT "pro_session_clientId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.680';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.643';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.629';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.683';--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.653';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.693';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.647';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.671';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.677';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.661';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.665';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.667';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.673';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-17 19:07:01.655';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "stripeId" text;--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "reportId" text;--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "observationId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intolerences" ADD CONSTRAINT "intolerences_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_clientId_pets_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_reportId_report_id_fk" FOREIGN KEY ("reportId") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_observationId_observations_id_fk" FOREIGN KEY ("observationId") REFERENCES "public"."observations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ask_estimate" DROP COLUMN IF EXISTS "sessionType";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "siret";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "siren";