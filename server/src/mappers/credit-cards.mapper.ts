import { CreditCardDTO } from "../dto/credit-cards.dto";
import { CreditCardDB } from "../repositories/schema/credit-cards.schema";

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
}
