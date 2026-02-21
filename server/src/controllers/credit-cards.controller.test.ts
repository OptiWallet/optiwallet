import { describe, expect, it, mock } from "bun:test";
import type { CreditCardModel } from "../models/credit-cards.model.ts";

mock.module("../mappers/credit-cards.mapper.ts", () => {
  return {
    toCreditCardDTO: (card: CreditCardModel) => ({ ...card }),
  };
});

const testId = "550e8400-e29b-41d4-a716-446655440000";

mock.module("../repositories/db/credit-cards.db.ts", () => ({
  listCreditCards: async () => [
    { 
      id: testId, 
      name: "Test Card",
      issuer: "td",
      network: "visa",
      minimumIncome: null,
      minimumCreditScore: null
    } as CreditCardModel,
  ],
  getCreditCardFromDb: async (id: string) =>
    id === testId
      ? ({ 
          id: testId, 
          name: "Test Card",
          issuer: "td",
          network: "visa",
          minimumIncome: null,
          minimumCreditScore: null
        } as CreditCardModel)
      : (() => {
          throw new Error(`Credit card with id ${id} not found`);
        })(),
}));

mock.module("../repositories/cache.ts", () => ({
  getFromCache: async <T>(key: string, fn: () => Promise<T>) => await fn(),
}));

import * as controller from "../controllers/credit-cards.controller";

describe("credit-card.controller", () => {
  describe("getCreditCards", () => {
    it("returns a list of credit cards", async () => {
      const result = await controller.getCreditCardsHandler({});
      expect(Array.isArray(result)).toBe(true);
      expect((result[0] as CreditCardModel)?.id).toBe(testId);
    });
  });

  describe("getCreditCard", () => {
    it("returns a credit card DTO for valid id", async () => {
      const result = await controller.getCreditCardHandler(testId);
      expect((result as CreditCardModel).id).toBe(testId);
    });

    it("throws if card not found", async () => {
      await expect(controller.getCreditCardHandler("550e8400-e29b-41d4-a716-446655440999")).rejects.toThrow();
    });
  });
});
