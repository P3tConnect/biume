ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.889';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.883';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.843';--> statement-breakpoint
ALTER TABLE "bg_jobs" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.874';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.831';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.854';--> statement-breakpoint
ALTER TABLE "company_membership" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.875';--> statement-breakpoint
ALTER TABLE "company_address" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.870';--> statement-breakpoint
ALTER TABLE "company_certifications" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.835';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.894';--> statement-breakpoint
ALTER TABLE "company_documents" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.835';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.891';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.886';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.846';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.838';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.877';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.858';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.859';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.862';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.863';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.848';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.877';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.854';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.869';--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.871';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-09-23 15:02:21.854';--> statement-breakpoint
ALTER TABLE "report" ADD COLUMN "reportTemplateId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_reportTemplateId_report_template_id_fk" FOREIGN KEY ("reportTemplateId") REFERENCES "public"."report_template"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
