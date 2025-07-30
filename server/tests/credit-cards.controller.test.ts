import { describe, it, expect, mock } from "bun:test";
import type { CreditCardDB } from "../src/models/credit-cards.model";

mock.module("../src/mappers/credit-cards.mapper.ts", () => {
  return {
    toCreditCardDTO: (card: CreditCardDB) => ({ ...card }),
  };
});

mock.module("../src/repositories/db/credit-cards.db.ts", () => ({
  listCreditCards: async () => [{ id: 1, name: "Test Card" } as CreditCardDB],
  getCreditCardFromDb: async (id: number) =>
    id === 1
      ? ({ id: 1, name: "Test Card" } as CreditCardDB)
      : (() => {
          throw new Error(`Credit card with id ${id} not found`);
        })(),
}));

mock.module("../src/repositories/cache.ts", () => ({
  getFromCache: async <T>(key: string, fn: () => Promise<T>) => await fn(),
}));

import * as controller from "../src/controllers/credit-cards.controller";

describe("credit-card.controller", () => {
  describe("getCreditCards", () => {
    it("returns a list of credit cards", async () => {
      const result = await controller.getCreditCards({});
      expect(Array.isArray(result)).toBe(true);
      expect((result[0] as CreditCardDB)?.id).toBe(1);
    });
  });

  describe("getCreditCard", () => {
    it("returns a credit card DTO for valid id", async () => {
      const result = await controller.getCreditCard(1);
      expect((result as CreditCardDB).id).toBe(1);
    });

    it("throws for invalid id", async () => {
      await expect(controller.getCreditCard(NaN)).rejects.toThrow();
      await expect(controller.getCreditCard(0)).rejects.toThrow();
    });

    it("throws if card not found", async () => {
      await expect(controller.getCreditCard(999)).rejects.toThrow();
    });
  });
});
