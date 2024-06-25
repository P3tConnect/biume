CREATE TABLE IF NOT EXISTS "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"ownerId" text,
	"createdAt" timestamp DEFAULT '2024-06-25 07:48:56.425',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receip_category" (
	"receiptId" text,
	"categoryId" text
);
--> statement-breakpoint
ALTER TABLE "alerts_types" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.397';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.445';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.410';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.399';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.453';--> statement-breakpoint
ALTER TABLE "deseases" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "deseases" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.416';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.449';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.413';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.406';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.440';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.429';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.431';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.432';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.434';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.418';--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.438';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.440';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.425';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.438';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-25 07:48:56.425';--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "openAt" date;--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "closeAt" date;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_ownerId_company_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receip_category" ADD CONSTRAINT "receip_category_receiptId_receipt_id_fk" FOREIGN KEY ("receiptId") REFERENCES "public"."receipt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "receip_category" ADD CONSTRAINT "receip_category_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
