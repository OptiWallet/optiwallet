import type { InferSelectModel } from "drizzle-orm";
import { creditCards } from "../repositories/schema/credit-cards.schema";

export type CreditCardModel = InferSelectModel<typeof creditCards>;
