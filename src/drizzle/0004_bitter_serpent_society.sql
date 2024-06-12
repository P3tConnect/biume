DO $$ BEGIN
 CREATE TYPE "public"."askEstimateStatus" AS ENUM('PENDING', 'PAYED', 'CANCELLED', 'REVOKED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('CLIENT', 'COMMUNICATION', 'VETERINARY', 'OSTEOPATH', 'NATUROPATH', 'EDUCATOR', 'COMPORTEMENTALIST', 'TOILLETEUR', 'MASSEUR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "session_status_type" ADD VALUE 'WAITING FROM CLIENT';--> statement-breakpoint
ALTER TYPE "session_status_type" ADD VALUE 'REFUND';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alerts_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"color" text,
	"ownerId" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ask_estimate_options" (
	"askEstimateId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cancel_policies" (
	"id" serial PRIMARY KEY NOT NULL,
	"daysBefore" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_slots" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estimate" (
	"id" serial PRIMARY KEY NOT NULL,
	"sessionId" text,
	"total" integer,
	"createdAt" timestamp DEFAULT '2024-06-11 12:44:42.611' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estimate_options" (
	"estimateId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice_options" (
	"invoiceId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "options" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"companyId" text,
	"createdAt" timestamp DEFAULT '2024-06-11 12:44:42.604' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "refund_stages" (
	"id" serial PRIMARY KEY NOT NULL,
	"cancelPoliciesId" text,
	"companyId" text,
	"refundPercent" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "beginAt" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "endAt" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "status" SET DATA TYPE session_status_type;--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "status" SET DEFAULT 'IN PROGRESS';--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "alertType" text;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "daysBefore" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "form" text;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "to" text;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "alerts" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "allergies" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "allergies" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "allergies" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "allergies" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.588' NOT NULL;--> statement-breakpoint
ALTER TABLE "allergies" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "status" "askEstimateStatus" DEFAULT 'PENDING';--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "beginAt" date NOT NULL;--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "endAt" date NOT NULL;--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "creator" text;--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "atHome" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "sessionType" "session_type" DEFAULT 'oneToOne';--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.599';--> statement-breakpoint
ALTER TABLE "ask_estimate" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "cancelPoliciesId" text;--> statement-breakpoint
ALTER TABLE "employee_company" ADD COLUMN "employeeId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employee_company" ADD COLUMN "companyId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'CLIENT';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isPro" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "intolerences" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "intolerences" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "intolerences" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "intolerences" ADD COLUMN "ownerId" text;--> statement-breakpoint
ALTER TABLE "intolerences" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.624' NOT NULL;--> statement-breakpoint
ALTER TABLE "intolerences" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "sessionId" text;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "total" integer;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.626' NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "redactor" text;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "images" text[];--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.627' NOT NULL;--> statement-breakpoint
ALTER TABLE "newsletter" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "atHome" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "type" "session_type" DEFAULT 'oneToOne' NOT NULL;--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.599' NOT NULL;--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "ownerId" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "color" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "beginAt" date NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "endAt" date NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "isImportant" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "link" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.632';--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "rate" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "comment" text;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "proId" text;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "isRecommanded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.634';--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "price" integer;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "proId" text;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.638';--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "ownerId" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "color" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "beginAt" date;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "endAt" date;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-11 12:44:42.640';--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "users_newsletters" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "users_newsletters" ADD COLUMN "newsletterId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alerts_types" ADD CONSTRAINT "alerts_types_ownerId_company_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ask_estimate_options" ADD CONSTRAINT "ask_estimate_options_askEstimateId_ask_estimate_id_fk" FOREIGN KEY ("askEstimateId") REFERENCES "public"."ask_estimate"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ask_estimate_options" ADD CONSTRAINT "ask_estimate_options_optionId_options_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "estimate" ADD CONSTRAINT "estimate_sessionId_pro_session_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."pro_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "estimate_options" ADD CONSTRAINT "estimate_options_estimateId_estimate_id_fk" FOREIGN KEY ("estimateId") REFERENCES "public"."estimate"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "estimate_options" ADD CONSTRAINT "estimate_options_optionId_options_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice_options" ADD CONSTRAINT "invoice_options_invoiceId_invoice_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoice"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice_options" ADD CONSTRAINT "invoice_options_optionId_options_id_fk" FOREIGN KEY ("optionId") REFERENCES "public"."options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "options" ADD CONSTRAINT "options_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refund_stages" ADD CONSTRAINT "refund_stages_cancelPoliciesId_cancel_policies_id_fk" FOREIGN KEY ("cancelPoliciesId") REFERENCES "public"."cancel_policies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refund_stages" ADD CONSTRAINT "refund_stages_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alerts" ADD CONSTRAINT "alerts_alertType_alerts_types_id_fk" FOREIGN KEY ("alertType") REFERENCES "public"."alerts_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alerts" ADD CONSTRAINT "alerts_form_company_id_fk" FOREIGN KEY ("form") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alerts" ADD CONSTRAINT "alerts_to_user_id_fk" FOREIGN KEY ("to") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ask_estimate" ADD CONSTRAINT "ask_estimate_creator_user_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_cancelPoliciesId_cancel_policies_id_fk" FOREIGN KEY ("cancelPoliciesId") REFERENCES "public"."cancel_policies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_company" ADD CONSTRAINT "employee_company_employeeId_user_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_company" ADD CONSTRAINT "employee_company_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intolerences" ADD CONSTRAINT "intolerences_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_sessionId_pro_session_id_fk" FOREIGN KEY ("sessionId") REFERENCES "public"."pro_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_redactor_company_id_fk" FOREIGN KEY ("redactor") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_company_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_proId_company_id_fk" FOREIGN KEY ("proId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_proId_company_id_fk" FOREIGN KEY ("proId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_ownerId_company_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_newsletters" ADD CONSTRAINT "users_newsletters_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_newsletters" ADD CONSTRAINT "users_newsletters_newsletterId_newsletter_id_fk" FOREIGN KEY ("newsletterId") REFERENCES "public"."newsletter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
