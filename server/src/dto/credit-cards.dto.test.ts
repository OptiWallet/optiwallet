import { describe, expect, test } from "bun:test";
import { Value } from "@sinclair/typebox/value";
import { createCreditCardSchema, updateCreditCardSchema } from "./credit-cards.dto";

describe("credit-cards.dto", () => {
  describe("createCreditCardSchema", () => {
    test("validates valid credit card", () => {
      const validCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        minimumIncome: 50000,
        minimumCreditScore: 700,
        cashback: [
          { category: "groceries", value: 5 },
          { category: "gas", value: 3 },
        ],
      };
      
      expect(Value.Check(createCreditCardSchema, validCard)).toBe(true);
    });

    test("rejects invalid issuer", () => {
      const invalidCard = {
        name: "Test Card",
        issuer: "invalid_issuer",
        network: "visa",
      };
      
      expect(Value.Check(createCreditCardSchema, invalidCard)).toBe(false);
    });

    test("rejects invalid network", () => {
      const invalidCard = {
        name: "Test Card",
        issuer: "td",
        network: "invalid_network",
      };
      
      expect(Value.Check(createCreditCardSchema, invalidCard)).toBe(false);
    });

    test("rejects invalid cashback category", () => {
      const invalidCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        cashback: [{ category: "invalid_category", value: 5 }],
      };
      
      expect(Value.Check(createCreditCardSchema, invalidCard)).toBe(false);
    });

    test("rejects cashback value below minimum", () => {
      const invalidCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        cashback: [{ category: "groceries", value: 0 }],
      };
      
      expect(Value.Check(createCreditCardSchema, invalidCard)).toBe(false);
    });

    test("rejects cashback value above maximum", () => {
      const invalidCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        cashback: [{ category: "groceries", value: 101 }],
      };
      
      expect(Value.Check(createCreditCardSchema, invalidCard)).toBe(false);
    });

    test("accepts cashback value at minimum boundary", () => {
      const validCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        cashback: [{ category: "groceries", value: 0.01 }],
      };
      
      expect(Value.Check(createCreditCardSchema, validCard)).toBe(true);
    });

    test("accepts cashback value at maximum boundary", () => {
      const validCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        cashback: [{ category: "groceries", value: 100 }],
      };
      
      expect(Value.Check(createCreditCardSchema, validCard)).toBe(true);
    });

    test("accepts card without cashback", () => {
      const validCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
      };
      
      expect(Value.Check(createCreditCardSchema, validCard)).toBe(true);
    });

    test("accepts card with optional fields", () => {
      const validCard = {
        name: "Test Card",
        issuer: "td",
        network: "visa",
        minimumIncome: null,
        minimumCreditScore: null,
        programId: null,
      };
      
      expect(Value.Check(createCreditCardSchema, validCard)).toBe(true);
    });

    test("rejects name shorter than 3 characters", () => {
      const invalidCard = {
        name: "AB",
        issuer: "td",
        network: "visa",
      };
      
      expect(Value.Check(createCreditCardSchema, invalidCard)).toBe(false);
    });
  });

  describe("updateCreditCardSchema", () => {
    test("accepts partial update", () => {
      const partialUpdate = {
        name: "Updated Name",
      };
      
      expect(Value.Check(updateCreditCardSchema, partialUpdate)).toBe(true);
    });

    test("accepts cashback update", () => {
      const update = {
        cashback: [{ category: "dining", value: 4 }],
      };
      
      expect(Value.Check(updateCreditCardSchema, update)).toBe(true);
    });

    test("rejects invalid cashback in update", () => {
      const invalidUpdate = {
        cashback: [{ category: "invalid", value: 5 }],
      };
      
      expect(Value.Check(updateCreditCardSchema, invalidUpdate)).toBe(false);
    });
  });
});
