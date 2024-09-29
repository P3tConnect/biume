ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.975';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.969';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.930';--> statement-breakpoint
ALTER TABLE "bg_jobs" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.960';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.918';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.941';--> statement-breakpoint
ALTER TABLE "company_membership" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.962';--> statement-breakpoint
ALTER TABLE "company_address" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.956';--> statement-breakpoint
ALTER TABLE "company_certifications" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.923';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.979';--> statement-breakpoint
ALTER TABLE "company_documents" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.923';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.977';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.971';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.933';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.926';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.964';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.934';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.964';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.942';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.946';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.947';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.942';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.950';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.955';--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-25 11:07:58.957';--> statement-breakpoint
ALTER TABLE "pro_session" ADD COLUMN "serviceId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pro_session" ADD CONSTRAINT "pro_session_serviceId_service_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
