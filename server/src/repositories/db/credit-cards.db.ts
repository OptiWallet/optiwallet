import type { CreditCardDB } from "../../models/credit-cards.model";
import { db } from "../db";
import type { CreditCardTable } from "../schema/credit-cards.schema";
import * as creditCardSchema from "../schema/credit-cards.schema";
import { getFilterConditions, getSortExpression } from "./db.utils";
import type { Filter, Sort } from "./types";
const { creditCards } = creditCardSchema;

export const listCreditCards = async (
  filters?: Filter<CreditCardTable>[],
  sort?: Sort<CreditCardDB>
): Promise<CreditCardDB[]> => {
  const filterCondition = getFilterConditions<CreditCardTable>(
    filters,
    creditCards
  );

  return await db.query.creditCards.findMany({
    where: filterCondition,
    ...(sort && {
      orderBy: getSortExpression(sort),
    }),
  });
};
