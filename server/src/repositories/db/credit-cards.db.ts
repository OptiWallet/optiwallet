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

export const getCreditCardFromDb = async (id: string): Promise<CreditCardModel> => {
  const card = await db.query.creditCards.findFirst({
    where: (fields, operators) => operators.eq(fields.id, id),
    with: {
      cashback: true,
    },
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
  logger.info(`Listing credit cards...`);

  const res = await db.query.creditCards.findMany({
    where: filterCondition,
    with: {
      cashback: true,
    },
    ...(sort && {
      orderBy: getSortExpression(sort),
    }),
  });

  logger.info(`Listed credit cards ${JSON.stringify(res)}`);
  return res;
};

export const updateCreditCard = async (
  id: string,
  creditCard: Partial<CreditCardModel>
): Promise<void> => {
  logger.info(`Updating credit card ${id}`);
  await db.update(creditCards).set(creditCard).where(eq(creditCards.id, id));
  logger.info("Credit card updated successfully");
};

export const deleteCreditCard = async (id: string): Promise<void> => {
  logger.info(`Deleting credit card ${id}`);
  await db.delete(creditCards).where(eq(creditCards.id, id));
  logger.info("Credit card deleted successfully");
};

export const createCreditCard = async (
  creditCard: Omit<CreditCardModel, "id">
): Promise<CreditCardModel> => {
  logger.info(`Creating credit card ${JSON.stringify(creditCard)}`);
  const [newCard] = await db.insert(creditCards).values(creditCard).returning();
  if (!newCard) {
    throw new Error("Failed to create credit card");
  }
  logger.info("Credit card created successfully");
  return newCard;
};

export const createCashbackEntries = async (
  creditCardId: string,
  entries: Array<{ category: string; value: number }>
): Promise<void> => {
  logger.info(`Creating ${entries.length} cashback entries for card ${creditCardId}`);
  const { cashback } = await import("../schema/cashback.schema");
  await db.insert(cashback).values(
    entries.map(entry => ({
      credit_card_id: creditCardId,
      category: entry.category,
      value: entry.value,
    }))
  );
  logger.info("Cashback entries created successfully");
};
