CREATE TYPE "public"."askEstimateStatus" AS ENUM('USER PENDING', 'USER ACCEPTED', 'REJECTED BY USER', 'CANCELED BY USER', 'USER PAYED', 'COMPANY PENDING', 'COMPANY ACCEPTED', 'REJECTED BY COMPANY', 'POSTPONED BY COMPANY', 'CANCELED BY COMPANY');--> statement-breakpoint
CREATE TYPE "public"."jobStatus" AS ENUM('pending', 'in_progress', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."jobType" AS ENUM('reminder', 'newsletter', 'payout', 'refund', 'none');--> statement-breakpoint
CREATE TYPE "public"."notificationType" AS ENUM('rate', 'newClient', 'newReport', 'newAskReservation');--> statement-breakpoint
CREATE TYPE "public"."petType" AS ENUM('Dog', 'Cat', 'Bird', 'Horse', 'NAC');--> statement-breakpoint
CREATE TYPE "public"."session_status_type" AS ENUM('CLIENT PAYED', 'CLIENT PENDING', 'CLIENT CANCELED', 'CLIENT ACCEPTED', 'COMPANY PENDING', 'COMPANY ACCEPTED', 'COMPANY CANCELED', 'COMPANY POSTPONED');--> statement-breakpoint
CREATE TYPE "public"."session_type" AS ENUM('oneToOne', 'multiple');--> statement-breakpoint
CREATE TYPE "public"."widgetsOrientation" AS ENUM('Horizontal', 'Vertical');--> statement-breakpoint
CREATE TYPE "public"."widgetsType" AS ENUM('Square', 'Rectangle');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('BASIC', 'PREMIUM', 'ULTIMATE', 'NONE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"password" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" text PRIMARY KEY NOT NULL,
	"lat" integer,
	"lng" integer,
	"zip" integer,
	"postalAddress" text NOT NULL,
	"cntryCode" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.946',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergies" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"ownerId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.975',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ask_estimate" (
	"id" text PRIMARY KEY NOT NULL,
	"status" "askEstimateStatus" DEFAULT 'USER PENDING',
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"creator" text NOT NULL,
	"for" text,
	"atHome" boolean DEFAULT false,
	"message" text,
	"new" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.964',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ask_estimate_options" (
	"askEstimateId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bg_jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"jobType" "jobType" DEFAULT 'none',
	"from" text,
	"to" text NOT NULL,
	"dateToExecute" date,
	"status" "jobStatus" DEFAULT 'pending',
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.962',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cancel_policies" (
	"id" text PRIMARY KEY NOT NULL,
	"daysBefore" integer NOT NULL,
	"refundPercent" integer NOT NULL,
	"organizationId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.936',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"ownerId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.954',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deseases" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"ownerId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_address" (
	"id" text PRIMARY KEY NOT NULL,
	"lat" integer,
	"lng" integer,
	"zip" integer,
	"postalAddress" text NOT NULL,
	"cntryCode" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.948',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_documents" (
	"id" text PRIMARY KEY NOT NULL,
	"siren" text,
	"siret" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.924',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_disponibilities" (
	"id" text PRIMARY KEY NOT NULL,
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"organizationId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.989',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_certifications" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text,
	"organizationDocumentsId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.923',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intolerences" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"ownerId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.978' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" text PRIMARY KEY NOT NULL,
	"total" integer,
	"sessionId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.966' NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice_options" (
	"invoiceId" text,
	"optionId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter" (
	"id" text PRIMARY KEY NOT NULL,
	"redactor" text,
	"images" text[],
	"title" text,
	"content" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.957',
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
CREATE TABLE IF NOT EXISTS "observations" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.968',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "options" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"organizationId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.966' NOT NULL,
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
	"furColor" text,
	"eyeColor" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp
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
CREATE TABLE IF NOT EXISTS "pro_session" (
	"id" text PRIMARY KEY NOT NULL,
	"proId" text,
	"clientId" text,
	"patientId" text,
	"reportId" text,
	"observationId" text,
	"serviceId" text NOT NULL,
	"beginAt" date NOT NULL,
	"endAt" date NOT NULL,
	"status" "session_status_type" DEFAULT 'COMPANY PENDING' NOT NULL,
	"atHome" boolean DEFAULT false NOT NULL,
	"type" "session_type" DEFAULT 'oneToOne' NOT NULL,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.968',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"organizationId" text,
	"unitPrice" integer NOT NULL,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.954',
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
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.939',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_invitees" (
	"userId" text,
	"projectId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (
	"id" text PRIMARY KEY NOT NULL,
	"rate" integer NOT NULL,
	"comment" text,
	"proId" text,
	"writerId" text NOT NULL,
	"isRecommanded" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.943',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receipt_category" (
	"receiptId" text,
	"categoryId" text
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
	"organizationId" text,
	"totalPrice" integer,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.954',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report_template" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"title" text NOT NULL,
	"description" text,
	"reportTemplateId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report_topic" (
	"reportId" text,
	"topicId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"name" text,
	"description" text,
	"price" integer,
	"proId" text,
	"duration" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_options" (
	"sessionId" text,
	"optionId" text
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
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.941',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topic" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"organizationId" text,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.931',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"from" text NOT NULL,
	"to" text,
	"status" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-11-26 20:20:37.959',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_jobs" (
	"userId" text,
	"jobId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_newsletters" (
	"userId" text,
	"newsletterId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "widgets" (
	"id" text PRIMARY KEY NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"type" "widgetsOrientation" DEFAULT 'Horizontal' NOT NULL,
	"organizationId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitations" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"status" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"inviterId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"activeOrganizationId" text,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "twoFactors" (
	"id" text PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backupCodes" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"twoFactorEnabled" boolean,
	"isPro" boolean NOT NULL,
	"onBoardingComplete" boolean NOT NULL,
	"stripeId" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"coverImage" text,
	"description" text,
	"createdAt" timestamp NOT NULL,
	"metadata" text,
	"stripeId" text,
	"onBoardingComplete" boolean NOT NULL,
	"openAt" date NOT NULL,
	"closeAt" date NOT NULL,
	"email" text NOT NULL,
	"atHome" boolean NOT NULL,
	"plan" "plan" DEFAULT 'NONE',
	"documentsId" text,
	"progressionId" text,
	"address" text,
	"nac" text,
	"locked" boolean DEFAULT false NOT NULL,
	"lang" text DEFAULT 'fr',
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug"),
	CONSTRAINT "organizations_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "allergies" ADD CONSTRAINT "allergies_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ask_estimate" ADD CONSTRAINT "ask_estimate_for_organizations_id_fk" FOREIGN KEY ("for") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "bg_jobs" ADD CONSTRAINT "bg_jobs_from_organizations_id_fk" FOREIGN KEY ("from") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cancel_policies" ADD CONSTRAINT "cancel_policies_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_ownerId_organizations_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deseases" ADD CONSTRAINT "deseases_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_disponibilities" ADD CONSTRAINT "organization_disponibilities_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_certifications" ADD CONSTRAINT "organization_certifications_organizationDocumentsId_organization_documents_id_fk" FOREIGN KEY ("organizationDocumentsId") REFERENCES "public"."organization_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intolerences" ADD CONSTRAINT "intolerences_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_redactor_organizations_id_fk" FOREIGN KEY ("redactor") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "options" ADD CONSTRAINT "options_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_proId_organizations_id_fk" FOREIGN KEY ("proId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_clientId_users_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_patientId_pets_id_fk" FOREIGN KEY ("patientId") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_serviceId_service_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_organizations_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects_invitees" ADD CONSTRAINT "projects_invitees_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "ratings" ADD CONSTRAINT "ratings_proId_organizations_id_fk" FOREIGN KEY ("proId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt_category" ADD CONSTRAINT "receipt_category_receiptId_receipt_id_fk" FOREIGN KEY ("receiptId") REFERENCES "public"."receipt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receipt_category" ADD CONSTRAINT "receipt_category_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "receipt" ADD CONSTRAINT "receipt_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_template" ADD CONSTRAINT "report_template_owner_id_organizations_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_reportTemplateId_report_template_id_fk" FOREIGN KEY ("reportTemplateId") REFERENCES "public"."report_template"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "report_topic" ADD CONSTRAINT "report_topic_topicId_topic_id_fk" FOREIGN KEY ("topicId") REFERENCES "public"."topic"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_proId_organizations_id_fk" FOREIGN KEY ("proId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "task" ADD CONSTRAINT "task_ownerId_organizations_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topic" ADD CONSTRAINT "topic_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_to_organizations_id_fk" FOREIGN KEY ("to") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_jobs" ADD CONSTRAINT "users_jobs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "users_newsletters" ADD CONSTRAINT "users_newsletters_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "widgets" ADD CONSTRAINT "widgets_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_inviterId_users_id_fk" FOREIGN KEY ("inviterId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "members" ADD CONSTRAINT "members_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "twoFactors" ADD CONSTRAINT "twoFactors_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_documentsId_organization_documents_id_fk" FOREIGN KEY ("documentsId") REFERENCES "public"."organization_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_progressionId_progression_id_fk" FOREIGN KEY ("progressionId") REFERENCES "public"."progression"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_address_address_id_fk" FOREIGN KEY ("address") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
