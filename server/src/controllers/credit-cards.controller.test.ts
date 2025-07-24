import { describe, expect, it, mock } from "bun:test";
import type { CreditCardModel } from "../models/credit-cards.model.ts";

mock.module("../mappers/credit-cards.mapper.ts", () => {
  return {
    toCreditCardDTO: (card: CreditCardModel) => ({ ...card }),
  };
});

mock.module("../repositories/db/credit-cards.db.ts", () => ({
  listCreditCards: async () => [
    { id: 1, name: "Test Card" } as CreditCardModel,
  ],
  getCreditCardFromDb: async (id: number) =>
    id === 1
      ? ({ id: 1, name: "Test Card" } as CreditCardModel)
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
      expect((result[0] as CreditCardModel)?.id).toBe(1);
    });
  });

  describe("getCreditCard", () => {
    it("returns a credit card DTO for valid id", async () => {
      const result = await controller.getCreditCardHandler(1);
      expect((result as CreditCardModel).id).toBe(1);
    });

    it("throws for invalid id", async () => {
      await expect(controller.getCreditCardHandler(NaN)).rejects.toThrow();
      await expect(controller.getCreditCardHandler(0)).rejects.toThrow();
    });

    it("throws if card not found", async () => {
      await expect(controller.getCreditCardHandler(999)).rejects.toThrow();
    });
  });
});
