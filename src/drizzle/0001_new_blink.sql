DO $$ BEGIN
 CREATE TYPE "public"."notificationType" AS ENUM('rate', 'newClient', 'newReport', 'newAskReservation');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_certifications" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text,
	"companyId" text,
	"createdAt" timestamp DEFAULT '2024-09-11 07:42:14.459',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"notificationType" text NOT NULL,
	"message" text NOT NULL,
	"userId" text,
	"new" boolean DEFAULT true,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.500';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.494';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.467';--> statement-breakpoint
ALTER TABLE "bg_jobs" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.490';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.456';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.475';--> statement-breakpoint
ALTER TABLE "company_address" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.486';--> statement-breakpoint
ALTER TABLE "company_documents" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.460';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.504';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.502';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.497';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.469';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.463';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.491';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.478';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.479';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.480';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.481';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.471';--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.485';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.491';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.475';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.485';--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.508';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-11 07:42:14.475';--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "new" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "lang" text DEFAULT 'fr';--> statement-breakpoint
ALTER TABLE "company_address" ADD COLUMN "cntryCode" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "locked" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lang" text DEFAULT 'fr';--> statement-breakpoint
ALTER TABLE "widgets" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_certifications" ADD CONSTRAINT "company_certifications_companyId_company_documents_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "company_documents" DROP COLUMN IF EXISTS "certifications";--> statement-breakpoint
ALTER TABLE "company_disponibilities" DROP COLUMN IF EXISTS "sessionType";