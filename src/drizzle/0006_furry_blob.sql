CREATE TABLE IF NOT EXISTS "projects_invitees" (
	"userId" text,
	"projectId" text
);
--> statement-breakpoint
DROP TABLE "refund_stages";--> statement-breakpoint
ALTER TABLE "company_slots" RENAME TO "company_disponibilities";--> statement-breakpoint
ALTER TABLE "company" DROP CONSTRAINT "company_cancelPoliciesId_cancel_policies_id_fk";
--> statement-breakpoint
ALTER TABLE "intolerences" DROP CONSTRAINT "intolerences_ownerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.265';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.281';--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.280';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.296';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.280';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.299';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.280';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.252';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.259';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.262';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.302';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-15 15:31:51.280';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD CONSTRAINT "company_disponibilities_companyId_pk" PRIMARY KEY("companyId");--> statement-breakpoint
ALTER TABLE "cancel_policies" ADD COLUMN "refundPercent" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "cancel_policies" ADD COLUMN "companyId" text;--> statement-breakpoint
ALTER TABLE "cancel_policies" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-15 15:31:51.237';--> statement-breakpoint
ALTER TABLE "cancel_policies" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "documentsId" text;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "progressionId" text;--> statement-breakpoint
ALTER TABLE "company_documents" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "company_documents" ADD COLUMN "siren" text;--> statement-breakpoint
ALTER TABLE "company_documents" ADD COLUMN "siret" text;--> statement-breakpoint
ALTER TABLE "company_documents" ADD COLUMN "certifications" text;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "beginAt" date NOT NULL;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "endAt" date NOT NULL;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "sessionType" "session_type" DEFAULT 'oneToOne';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "companyId" text;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-15 15:31:51.285';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "writerId" text;--> statement-breakpoint
ALTER TABLE "progression" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "progression" ADD COLUMN "docs" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "progression" ADD COLUMN "cancelPolicies" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "progression" ADD COLUMN "reminders" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "progression" ADD COLUMN "services" boolean DEFAULT false;--> statement-breakpoint
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
 ALTER TABLE "cancel_policies" ADD CONSTRAINT "cancel_policies_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "intolerences" ADD CONSTRAINT "intolerences_ownerId_company_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
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
ALTER TABLE "company" DROP COLUMN IF EXISTS "cancelPoliciesId";