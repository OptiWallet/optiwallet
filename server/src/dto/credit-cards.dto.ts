import { type Static, t } from "elysia";
import { CreditCardIssuer, CreditCardNetwork, CashbackCategory } from "../repositories/constants";

const networks: string = Object.values(CreditCardNetwork).join("|");
const issuers: string = Object.values(CreditCardIssuer).join("|");
const categories: string = Object.values(CashbackCategory).join("|");

const cashbackInputSchema = t.Object({
  category: t.String({ pattern: `^(${categories})$` }),
  value: t.Number({ minimum: 0.01, maximum: 100 }),
});

const cashbackOutputSchema = t.Object({
  id: t.String({ format: "uuid" }),
  category: t.String({ pattern: `^(${categories})$` }),
  value: t.Number({ minimum: 0.01, maximum: 100 }),
});

export const creditCardValidationSchema = t.Object({
  id: t.String({ format: "uuid" }),
  name: t.String({ minLength: 3 }),
  issuer: t.String({ pattern: `^(${issuers})$` }),
  network: t.String({ pattern: `^(${networks})$` }),
  minimumIncome: t.Nullable(t.Integer()),
  minimumCreditScore: t.Nullable(t.Integer()),
  programId: t.Optional(t.Nullable(t.String({ format: "uuid" }))),
  cashback: t.Optional(t.Array(cashbackOutputSchema)),
});

export const createCreditCardSchema = t.Object({
  name: t.String({ minLength: 3 }),
  issuer: t.String({ pattern: `^(${issuers})$` }),
  network: t.String({ pattern: `^(${networks})$` }),
  minimumIncome: t.Optional(t.Nullable(t.Integer())),
  minimumCreditScore: t.Optional(t.Nullable(t.Integer())),
  programId: t.Optional(t.Nullable(t.String({ format: "uuid" }))),
  cashback: t.Optional(t.Array(cashbackInputSchema)),
});

export const updateCreditCardSchema = t.Partial(t.Object({
  name: t.String({ minLength: 3 }),
  issuer: t.String({ pattern: `^(${issuers})$` }),
  network: t.String({ pattern: `^(${networks})$` }),
  minimumIncome: t.Nullable(t.Integer()),
  minimumCreditScore: t.Nullable(t.Integer()),
  programId: t.Nullable(t.String({ format: "uuid" })),
  cashback: t.Array(cashbackInputSchema),
}));

export type CreditCardDTO = Static<typeof creditCardValidationSchema>;
export type CreateCreditCardDTO = Static<typeof createCreditCardSchema>;
export type UpdateCreditCardDTO = Static<typeof updateCreditCardSchema>;
