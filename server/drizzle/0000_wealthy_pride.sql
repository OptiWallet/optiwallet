CREATE TABLE "programs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"program" text NOT NULL,
	"point_cash_ratio" real DEFAULT 1 NOT NULL,
	CONSTRAINT "program" CHECK (program IN ('td_rewards','bmo_rewards','air_miles','aeroplan','westjet','cashback','american_express_membership_rewards'))
);
--> statement-breakpoint
CREATE TABLE "creditCards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"issuer" text NOT NULL,
	"network" text NOT NULL,
	"minimum_income" integer,
	"minimum_credit_score" integer,
	"program_id" uuid,
	CONSTRAINT "issuer_check" CHECK (issuer IN ('scotiabank','bmo','td','rbc','cibc','national_bank','mbna','desjardins','american_express','capital_one','brim','rogers','tangerine','wealthsimple','simplii','pc_financial','neo','vancity','canadian_tire','walmart','home_trust','koho')),
	CONSTRAINT "network_check" CHECK (network IN ('visa','mastercard','american_express'))
);
--> statement-breakpoint
CREATE TABLE "cashback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" text NOT NULL,
	"value" real NOT NULL,
	"credit_card_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "creditCards" ADD CONSTRAINT "creditCards_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashback" ADD CONSTRAINT "cashback_credit_card_id_creditCards_id_fk" FOREIGN KEY ("credit_card_id") REFERENCES "public"."creditCards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "network_index" ON "creditCards" USING btree ("network");--> statement-breakpoint
CREATE INDEX "credit_card_id" ON "cashback" USING btree ("credit_card_id");