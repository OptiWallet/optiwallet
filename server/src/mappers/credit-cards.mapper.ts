import type { CreditCardDTO, UpdateCreditCardDTO } from "../dto/credit-cards.dto";
import type { CreditCardModel } from "../models/credit-cards.model";

export const toCreditCardDTO = (creditCard: CreditCardModel): CreditCardDTO => {
  return {
    id: creditCard.id,
    name: creditCard.name,
    issuer: creditCard.issuer,
    network: creditCard.network,
    minimumIncome: creditCard.minimumIncome,
    minimumCreditScore: creditCard.minimumCreditScore,
    programId: creditCard.programId,
    cashback: creditCard.cashback?.map(cb => ({
      id: cb.id,
      category: cb.category,
      value: cb.value,
    })),
  };
};

export const toPartialCreditCardModel = (
  creditCard: Partial<CreditCardDTO> | UpdateCreditCardDTO
): Partial<CreditCardModel> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cashback, ...rest } = creditCard as Partial<CreditCardDTO>;
  return {
    id: rest.id,
    name: rest.name,
    issuer: rest.issuer,
    network: rest.network,
    minimumIncome: rest.minimumIncome,
    minimumCreditScore: rest.minimumCreditScore,
    programId: rest.programId,
  };
};
