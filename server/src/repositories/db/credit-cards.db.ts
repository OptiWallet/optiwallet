import pino from "pino";
import type { CreditCardModel } from "../../models/credit-cards.model";
import { db } from "../db";
import type { CreditCardTable } from "../schema/credit-cards.schema";
import * as creditCardSchema from "../schema/credit-cards.schema";
import { getFilterConditions, getSortExpression } from "./db.utils";
import type { Filter, Sort } from "./types";
import { NotFoundError } from "elysia";
import { eq } from "drizzle-orm";
const logger = pino();

const { creditCards } = creditCardSchema;

export const getCreditCardFromDb = async (id: number): Promise<CreditCardModel> => {
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
  sort?: Sort<CreditCardModel>
): Promise<CreditCardModel[]> => {
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

export const updateCreditCard = async (
  id: number,
  creditCard: Partial<CreditCardModel>
): Promise<void> => {
  logger.info(`Updating credit card ${id}`);
  await db.update(creditCards).set(creditCard).where(eq(creditCards.id, id));
  logger.info("Credit card updated successfully");
};
export const deleteCreditCard = async (id: number): Promise<void> => {
  logger.info(`Deleting credit card ${id}`);
  await db.delete(creditCards).where(eq(creditCards.id, id));
  logger.info("Credit card deleted successfully");
};
