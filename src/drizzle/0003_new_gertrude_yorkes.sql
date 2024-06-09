DO $$ BEGIN
 CREATE TYPE "public"."petType" AS ENUM('Dog', 'Cat', 'Bird', 'Horse', 'NAC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."session_status_type" AS ENUM('PAYED', 'IN PROGRESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."session_type" AS ENUM('oneToOne', 'multiple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alerts" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergies" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ask_estimate" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_company" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intolerences" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "petType" DEFAULT 'Dog' NOT NULL,
	"weight" integer,
	"height" integer,
	"description" text,
	"ownerId" text,
	"nacType" text,
	"birthDate" timestamp NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pro_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"proId" text,
	"clientId" text,
	"beginAt" timestamp NOT NULL,
	"endAt" timestamp NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_newsletters" (

);
--> statement-breakpoint
DROP TABLE "plan";--> statement-breakpoint
DROP TABLE "subscription";--> statement-breakpoint
DROP TABLE "webhookEvent";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_proId_company_id_fk" FOREIGN KEY ("proId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_clientId_user_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
