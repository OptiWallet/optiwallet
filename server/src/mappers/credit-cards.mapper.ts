import type { CreditCardDTO } from "../dto/credit-cards.dto";
import type { CreditCardDB } from "../models/credit-cards.model";

export const toCreditCardDTO = (creditCard: CreditCardDB): CreditCardDTO => {
  return {
    id: creditCard.id,
    name: creditCard.name,
    issuer: creditCard.issuer,
    network: creditCard.network,
    minimumIncome: creditCard.minimumIncome,
    minimumCreditScore: creditCard.minimumCreditScore,
  };
};

export const toCreditCardDB = (creditCard: CreditCardDTO): CreditCardDB => {
  return {
    id: creditCard.id,
    name: creditCard.name,
    issuer: creditCard.issuer,
    network: creditCard.network,
    minimumIncome: creditCard.minimumIncome,
    minimumCreditScore: creditCard.minimumCreditScore,
  };
};
