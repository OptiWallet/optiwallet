import type { CreditCardDTO } from "../dto/credit-cards.dto";
import type { CreditCardModel } from "../models/credit-cards.model";

export const toCreditCardDTO = (creditCard: CreditCardModel): CreditCardDTO => {
  return {
    id: creditCard.id,
    name: creditCard.name,
    issuer: creditCard.issuer,
    network: creditCard.network,
    minimumIncome: creditCard.minimumIncome,
    minimumCreditScore: creditCard.minimumCreditScore,
  };
};

export const toCreditCardModel = (
  creditCard: CreditCardDTO
): CreditCardModel => {
  return {
    id: creditCard.id,
    name: creditCard.name,
    issuer: creditCard.issuer,
    network: creditCard.network,
    minimumIncome: creditCard.minimumIncome,
    minimumCreditScore: creditCard.minimumCreditScore,
  };
};

export const toPartialCreditCardModel = (
  creditCard: Partial<CreditCardDTO>
): Partial<CreditCardModel> => {
  return {
    id: creditCard.id,
    name: creditCard.name,
    issuer: creditCard.issuer,
    network: creditCard.network,
    minimumIncome: creditCard.minimumIncome,
    minimumCreditScore: creditCard.minimumCreditScore,
  };
};
