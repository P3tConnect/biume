CREATE TABLE IF NOT EXISTS "deseases" (
	"id" text,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"ownerId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_jobs" (
	"userId" text,
	"jobId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets_allergies" (
	"petId" text,
	"allergyId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets_deseases" (
	"petId" text,
	"deseaseId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets_intolerences" (
	"petId" text,
	"intolerenceId" text
);
--> statement-breakpoint
ALTER TABLE "alerts_types" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.097';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.142';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.107';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.099';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.149';--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.113';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.145';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.110';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.125';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.136';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.119';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.121';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.122';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.126';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.114';--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.135';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.136';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.130';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.135';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-24 12:09:43.130';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deseases" ADD CONSTRAINT "deseases_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_jobs" ADD CONSTRAINT "users_jobs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_jobs" ADD CONSTRAINT "users_jobs_jobId_job_id_fk" FOREIGN KEY ("jobId") REFERENCES "public"."job"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_allergies" ADD CONSTRAINT "pets_allergies_petId_pets_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_allergies" ADD CONSTRAINT "pets_allergies_allergyId_allergies_id_fk" FOREIGN KEY ("allergyId") REFERENCES "public"."allergies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_deseases" ADD CONSTRAINT "pets_deseases_petId_pets_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_deseases" ADD CONSTRAINT "pets_deseases_deseaseId_deseases_id_fk" FOREIGN KEY ("deseaseId") REFERENCES "public"."deseases"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_intolerences" ADD CONSTRAINT "pets_intolerences_petId_pets_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets_intolerences" ADD CONSTRAINT "pets_intolerences_intolerenceId_intolerences_id_fk" FOREIGN KEY ("intolerenceId") REFERENCES "public"."intolerences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "role";