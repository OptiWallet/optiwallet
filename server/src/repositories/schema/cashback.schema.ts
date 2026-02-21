import { index, pgTable, real, text, uuid } from "drizzle-orm/pg-core";
import { creditCards } from "./credit-cards.schema";

export const cashback = pgTable(
  "cashback",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    category: text("category").notNull(),
    value: real("value").notNull(),
    credit_card_id: uuid("credit_card_id")
      .notNull()
      .references(() => creditCards.id, { onDelete: "cascade" }),
  },
  (cashback) => [
    index("credit_card_id").on(cashback.credit_card_id),
  ]
);

export type CashbackTable = typeof cashback;
