import { index, pgTable, serial, text } from "drizzle-orm/pg-core";
export const creditCardsTable = pgTable(
  "creditCards",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    issuer: text("issuer").notNull(),
    network: text("network").notNull(),
  },
  (creditCards) => [index("network_index").on(creditCards.network)]
);
