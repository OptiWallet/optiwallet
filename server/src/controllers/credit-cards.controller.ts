import type { CreditCardDTO } from "../dto/credit-cards.dto";
import { toCreditCardDTO } from "../mappers/credit-cards.mapper";
import type { CreditCardDB } from "../models/credit-cards.model";
import { getFromCache } from "../repositories/cache";
import {
  listCreditCards,
  getCreditCardFromDb,
} from "../repositories/db/credit-cards.db";
import type { CreditCardTable } from "../repositories/schema/credit-cards.schema";
import { extractFilters, extractSort } from "./controllers.utils";

export const getCreditCards = async (
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
  const creditCards: CreditCardDB[] = await getFromCache(
    cacheKey,
    async () => await listCreditCards(filters, sort)
  );
  return creditCards.map((creditCard) => toCreditCardDTO(creditCard));
};

export const getCreditCard = async (id: number) => {
  const cacheKey = `creditCard[${id}]`;
  const creditCard: CreditCardDB = await getFromCache(
    cacheKey,
    async () => await getCreditCardFromDb(id)
  );
  return toCreditCardDTO(creditCard);
};

export const createCreditCard = (creditCard: CreditCardDTO) =>
  `create credit card with data ${JSON.stringify(creditCard)}`;
export const updateCreditCard = (
  id: string,
  creditCard: Partial<CreditCardDTO>
) => `update credit card with id ${id} with data ${JSON.stringify(creditCard)}`;
export const deleteCreditCard = (id: string) =>
  `delete credit card with id ${id}`;
