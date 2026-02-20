import type { CreditCardDTO } from "../dto/credit-cards.dto";
import {
  toCreditCardDTO,
  toPartialCreditCardModel,
} from "../mappers/credit-cards.mapper";
import type { CreditCardModel } from "../models/credit-cards.model";
import { getFromCache } from "../repositories/cache";
import {
  deleteCreditCard,
  getCreditCardFromDb,
  listCreditCards,
  updateCreditCard,
} from "../repositories/db/credit-cards.db";
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

export const getCreditCardHandler = async (id: number) => {
  const cacheKey = `creditCard[${id}]`;
  const creditCard: CreditCardModel = await getFromCache(
    cacheKey,
    async () => await getCreditCardFromDb(id)
  );
  return toCreditCardDTO(creditCard);
};

export const createCreditCardHandler = (creditCard: CreditCardDTO) =>
  `create credit card with data ${JSON.stringify(creditCard)}`;
export const updateCreditCardHandler = async (
  id: number,
  creditCard: Partial<CreditCardDTO>
) => {
  await updateCreditCard(id, toPartialCreditCardModel(creditCard));
  return `update credit card with id ${id} with data ${JSON.stringify(
    creditCard
  )}`;
};
export const deleteCreditCardHandler = async (id: number) => {
  await deleteCreditCard(id);
  return `delete credit card with id ${id}`;
};
