import { drizzle } from "drizzle-orm/bun-sql";
import { relations } from "drizzle-orm";
import * as creditCardSchema from "./schema/credit-cards.schema";
import * as cashbackSchema from "./schema/cashback.schema";
import * as programsSchema from "./schema/programs.schema";

export const creditCardsRelations = relations(creditCardSchema.creditCards, ({ many, one }) => ({
  cashback: many(cashbackSchema.cashback),
  program: one(programsSchema.programs, {
    fields: [creditCardSchema.creditCards.programId],
    references: [programsSchema.programs.id],
  }),
}));

export const cashbackRelations = relations(cashbackSchema.cashback, ({ one }) => ({
  creditCard: one(creditCardSchema.creditCards, {
    fields: [cashbackSchema.cashback.credit_card_id],
    references: [creditCardSchema.creditCards.id],
  }),
}));

export const db = drizzle(process.env.DATABASE_URL ?? "", {
  schema: {
    ...creditCardSchema,
    ...cashbackSchema,
    ...programsSchema,
    creditCardsRelations,
    cashbackRelations,
  },
});

