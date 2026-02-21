import type { InferSelectModel } from "drizzle-orm";
import { creditCards } from "../repositories/schema/credit-cards.schema";
import { cashback } from "../repositories/schema/cashback.schema";

export type CreditCardModel = InferSelectModel<typeof creditCards> & {
  cashback?: Array<InferSelectModel<typeof cashback>>;
};
