import type { CreditCardDTO, CreateCreditCardDTO, UpdateCreditCardDTO } from "../dto/credit-cards.dto";
import {
  toCreditCardDTO,
  toPartialCreditCardModel,
} from "../mappers/credit-cards.mapper";
import type { CreditCardModel } from "../models/credit-cards.model";
import { getFromCache } from "../repositories/cache";
import {
  createCreditCard,
  createCashbackEntries,
  deleteCreditCard,
  getCreditCardFromDb,
  listCreditCards,
  updateCreditCard,
} from "../repositories/db/credit-cards.db";
import { db } from "../repositories/db";
import type { CreditCardTable } from "../repositories/schema/credit-cards.schema";
import { extractFilters, extractSort } from "./controllers.utils";

export const getCreditCardsHandler = async (
  query: Record<string, string | number>
): Promise<CreditCardDTO[]> => {
  const sort = extractSort(query);
  const filters = extractFilters<CreditCardTable>(query);
  const filtersString = filters?.map((filter) =>
    Object.values(filter).join(",")
  );
  const sortString = sort ? `${sort.field},${sort.order}` : undefined;
  const cacheKey = `creditCards[${[filtersString, sortString]
    .filter((x) => x)
    .join("|")}]`;
  const creditCards: CreditCardModel[] = await getFromCache(
    cacheKey,
    async () => await listCreditCards(filters, sort)
  );
  return creditCards.map((creditCard) => toCreditCardDTO(creditCard));
};

export const getCreditCardHandler = async (id: string) => {
  const cacheKey = `creditCard[${id}]`;
  const creditCard: CreditCardModel = await getFromCache(
    cacheKey,
    async () => await getCreditCardFromDb(id)
  );
  return toCreditCardDTO(creditCard);
};

export const createCreditCardHandler = async (creditCard: CreateCreditCardDTO) => {
  const { cashback, ...cardData } = creditCard;
  const newCard = await createCreditCard({
    name: cardData.name,
    issuer: cardData.issuer,
    network: cardData.network,
    minimumIncome: cardData.minimumIncome ?? null,
    minimumCreditScore: cardData.minimumCreditScore ?? null,
    programId: cardData.programId ?? null,
  });
  
  // Create cashback entries if provided
  if (cashback && cashback.length > 0) {
    await createCashbackEntries(newCard.id, cashback);
  }
  
  return toCreditCardDTO(newCard);
};

export const updateCreditCardHandler = async (
  id: string,
  creditCard: UpdateCreditCardDTO
) => {
  const { cashback, ...cardData } = creditCard;
  
  // Update card data
  await updateCreditCard(id, toPartialCreditCardModel(cardData));
  
  // If cashback is provided, delete old entries and create new ones
  if (cashback !== undefined) {
    const { cashback: cashbackSchema } = await import("../repositories/schema/cashback.schema");
    const { eq } = await import("drizzle-orm");
    await db.delete(cashbackSchema).where(eq(cashbackSchema.credit_card_id, id));
    
    if (cashback.length > 0) {
      await createCashbackEntries(id, cashback);
    }
  }
  
  // Return updated card
  const updatedCard = await getCreditCardFromDb(id);
  return toCreditCardDTO(updatedCard);
};

export const deleteCreditCardHandler = async (id: string) => {
  await deleteCreditCard(id);
  return `delete credit card with id ${id}`;
};
