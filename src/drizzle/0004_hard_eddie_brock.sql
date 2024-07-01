ALTER TYPE "session_status_type" ADD VALUE 'WAITING FOR REFUND';--> statement-breakpoint
ALTER TYPE "session_status_type" ADD VALUE 'REFUNDED';--> statement-breakpoint
ALTER TYPE "session_status_type" ADD VALUE 'CANCELED';--> statement-breakpoint
ALTER TYPE "session_status_type" ADD VALUE 'POSTPAWNED';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" text PRIMARY KEY NOT NULL,
	"lat" integer,
	"lng" integer,
	"zip" integer,
	"postalAddress" text NOT NULL,
	"cntryCode" text,
	"createdAt" timestamp DEFAULT '2024-06-30 19:28:00.739',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_address" (
	"id" text PRIMARY KEY NOT NULL,
	"lat" integer,
	"lng" integer,
	"zip" integer,
	"postalAddress" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-30 19:28:00.717',
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"createdAt" timestamp DEFAULT '2024-06-30 19:28:00.754',
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "alerts_types" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.649';--> statement-breakpoint
ALTER TABLE "allergies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.729';--> statement-breakpoint
ALTER TABLE "ask_estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.676';--> statement-breakpoint
ALTER TABLE "cancel_policies" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.655';--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.696';--> statement-breakpoint
ALTER TABLE "company" ALTER COLUMN "address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "company_disponibilities" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.744';--> statement-breakpoint
ALTER TABLE "estimate" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.684';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "intolerences" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.733';--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.681';--> statement-breakpoint
ALTER TABLE "newsletter" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.669';--> statement-breakpoint
ALTER TABLE "pro_session" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.721';--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.704';--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.706';--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.707';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.710';--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.687';--> statement-breakpoint
ALTER TABLE "report" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.715';--> statement-breakpoint
ALTER TABLE "observations" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.720';--> statement-breakpoint
ALTER TABLE "receipt" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.696';--> statement-breakpoint
ALTER TABLE "topic" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.716';--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2024-06-30 19:28:00.696';--> statement-breakpoint
ALTER TABLE "company_documents" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-30 19:28:00.660';--> statement-breakpoint
ALTER TABLE "company_documents" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT '2024-06-30 19:28:00.740';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updateAt" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company" ADD CONSTRAINT "company_address_company_address_id_fk" FOREIGN KEY ("address") REFERENCES "public"."company_address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_address_address_id_fk" FOREIGN KEY ("address") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
