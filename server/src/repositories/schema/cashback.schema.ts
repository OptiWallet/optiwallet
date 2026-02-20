import { index, pgTable, real, text, uuid } from "drizzle-orm/pg-core";
import { creditCards } from "./credit-cards.schema";
import { programs } from "./programs.schema";

export const cashback = pgTable(
  "cashback",
  {
    id: uuid("id").primaryKey(),
    category: text("category").notNull(),
    value: real("value").notNull(),
    credit_card_id: uuid("credit_card_id")
      .notNull()
      .references(() => creditCards.id),
    program_id: uuid("program_id")
      .notNull()
      .references(() => programs.id),
  },
  (cashback) => [
    index("credit_card_id").on(cashback.credit_card_id),
    index("program_id").on(cashback.credit_card_id),
  ]
);

export type CashbackTable = typeof cashback;
