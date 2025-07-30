import { NotFoundError } from "elysia";
import type { CreditCardDB } from "../../models/credit-cards.model";
import { db } from "../db";
import type { CreditCardTable } from "../schema/credit-cards.schema";
import * as creditCardSchema from "../schema/credit-cards.schema";
import { getFilterConditions, getSortExpression } from "./db.utils";
import type { Filter, Sort } from "./types";
const { creditCards } = creditCardSchema;

export const getCreditCardFromDb = async (
  id: number
): Promise<CreditCardDB> => {
  const card = await db.query.creditCards.findFirst({
    where: (fields, operators) => operators.eq(fields.id, id),
  });
  if (!card) {
    throw new NotFoundError(`Credit card with id ${id} not found`);
  }
  return card;
};

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
