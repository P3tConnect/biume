DO $$ BEGIN
 CREATE TYPE "public"."askEstimateStatus" AS ENUM('PENDING', 'PAYED', 'CANCELLED', 'REVOKED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."plan" AS ENUM('BASIC', 'PREMIUM', 'ULTIMATE', 'NONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('CLIENT', 'COMMUNICATION', 'VETERINARY', 'OSTEOPATH', 'NATUROPATH', 'EDUCATOR', 'COMPORTEMENTALIST', 'GROOMER', 'MASSAGER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."petType" AS ENUM('Dog', 'Cat', 'Bird', 'Horse', 'NAC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."session_status_type" AS ENUM('PAYED', 'IN PROGRESS', 'WAITING FROM CLIENT', 'REFUND');
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
CREATE TABLE IF NOT EXISTS "accounts" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text,
	"alertType" text,
	"daysBefore" integer NOT NULL,
	"form" text,
	"to" text,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alerts_types" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"color" text,
	"ownerId" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergies" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.815' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ask_estimate" (
	"id" text PRIMARY KEY NOT NULL,
	"status" "askEstimateStatus" DEFAULT 'PENDING',
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"creator" text,
	"atHome" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.796',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ask_estimate_options" (
	"askEstimateId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cancel_policies" (
	"id" text PRIMARY KEY NOT NULL,
	"daysBefore" integer NOT NULL,
	"refundPercent" integer NOT NULL,
	"companyId" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.791',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"coverImage" text,
	"description" text,
	"address" text NOT NULL,
	"email" text NOT NULL,
	"ownerId" text,
	"atHome" boolean NOT NULL,
	"documentsId" text,
	"progressionId" text,
	"nac" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "company_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_documents" (
	"id" text PRIMARY KEY NOT NULL,
	"siren" text,
	"siret" text,
	"certifications" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_disponibilities" (
	"id" text PRIMARY KEY NOT NULL,
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"sessionType" "session_type" DEFAULT 'oneToOne',
	"companyId" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.818',
	"updatedAt" timestamp,
	CONSTRAINT "company_disponibilities_companyId_pk" PRIMARY KEY("companyId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_company" (
	"employeeId" text NOT NULL,
	"companyId" text NOT NULL,
	CONSTRAINT "employee_company_companyId_employeeId_pk" PRIMARY KEY("companyId","employeeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estimate" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text,
	"total" integer,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.800' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estimate_options" (
	"estimateId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" date,
	"image" text,
	"phone" text,
	"stripeId" text,
	"address" text NOT NULL,
	"plan" "plan" DEFAULT 'NONE',
	"role" "role" DEFAULT 'CLIENT',
	"isPro" boolean DEFAULT false,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intolerences" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"ownerId" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.817' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionId" text,
	"total" integer,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.798' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter" (
	"id" text PRIMARY KEY NOT NULL,
	"redactor" text,
	"images" text[],
	"title" text,
	"content" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.807',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets" (
	"id" text PRIMARY KEY NOT NULL,
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
	"id" text PRIMARY KEY NOT NULL,
	"proId" text,
	"clientId" text,
	"reportId" text,
	"observationId" text,
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"status" "session_status_type" DEFAULT 'IN PROGRESS' NOT NULL,
	"atHome" boolean DEFAULT false NOT NULL,
	"type" "session_type" DEFAULT 'oneToOne' NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.814' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"ownerId" text,
	"color" text,
	"location" text,
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"isImportant" boolean DEFAULT false,
	"note" text,
	"link" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.804',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (
	"id" text PRIMARY KEY NOT NULL,
	"rate" integer NOT NULL,
	"comment" text,
	"proId" text,
	"writerId" text,
	"isRecommanded" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.804',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"name" text,
	"description" text,
	"price" integer,
	"proId" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.805',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"ownerId" text,
	"description" text,
	"color" text,
	"location" text,
	"beginAt" date,
	"endAt" date,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.808',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_newsletters" (
	"userId" text,
	"newsletterId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice_options" (
	"invoiceId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "options" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"companyId" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.801' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "progression" (
	"id" text PRIMARY KEY NOT NULL,
	"docs" boolean DEFAULT false,
	"cancelPolicies" boolean DEFAULT false,
	"reminders" boolean DEFAULT false,
	"services" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_invitees" (
	"userId" text,
	"projectId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_options" (
	"sessionId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.813',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "observations" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.814',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"companyId" text,
	"unitPrice" integer NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.811',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipt_product" (
	"receiptId" text,
	"productId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipt" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"companyId" text,
	"totalPrice" integer,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.811',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report_topic" (
	"reportId" text,
	"topicId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topic" (
	"" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"companyId" text,
	"createdAt" timestamp DEFAULT '2024-06-18 08:46:18.813',
	"updatedAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "alerts_types" ADD CONSTRAINT "alerts_types_ownerId_company_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "cancel_policies" ADD CONSTRAINT "cancel_policies_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_documentsId_company_documents_id_fk" FOREIGN KEY ("documentsId") REFERENCES "public"."company_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_progressionId_progression_id_fk" FOREIGN KEY ("progressionId") REFERENCES "public"."progression"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_disponibilities" ADD CONSTRAINT "company_disponibilities_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_writerId_user_id_fk" FOREIGN KEY ("writerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "projects_invitees" ADD CONSTRAINT "projects_invitees_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_invitees" ADD CONSTRAINT "projects_invitees_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt_product" ADD CONSTRAINT "receipt_product_receiptId_receipt_id_fk" FOREIGN KEY ("receiptId") REFERENCES "public"."receipt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt_product" ADD CONSTRAINT "receipt_product_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt" ADD CONSTRAINT "receipt_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_topic" ADD CONSTRAINT "report_topic_reportId_report_id_fk" FOREIGN KEY ("reportId") REFERENCES "public"."report"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_topic" ADD CONSTRAINT "report_topic_topicId_topic__fk" FOREIGN KEY ("topicId") REFERENCES "public"."topic"("") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topic" ADD CONSTRAINT "topic_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
