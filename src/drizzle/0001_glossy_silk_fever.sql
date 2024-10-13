ALTER TABLE "company" DROP CONSTRAINT "company_ownerId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.230';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.219';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.149';--> statement-breakpoint
ALTER TABLE "bg_jobs" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.204';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.122';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.167';--> statement-breakpoint
ALTER TABLE "company_membership" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.207';--> statement-breakpoint
ALTER TABLE "company_address" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.196';--> statement-breakpoint
ALTER TABLE "company_certifications" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.135';--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.237';--> statement-breakpoint
ALTER TABLE "company_documents" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.136';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.232';--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.223';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.154';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.142';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.209';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.158';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.209';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.168';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.175';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.179';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.168';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.184';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.194';--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-12 20:39:28.199';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "firstname" text;--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "ownerId";