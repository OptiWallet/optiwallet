import { type Static, t } from "elysia";
import { CreditCardIssuer, CreditCardNetwork } from "../repositories/constants";

const networks: string = Object.keys(CreditCardNetwork).join("|");
const issuers: string = Object.keys(CreditCardIssuer).join("|");

export const creditCardValidationSchema = t.Object({
  id: t.Integer({ minimum: 1 }),
  name: t.String({ minLength: 3 }),
  issuer: t.String({ pattern: `^(${issuers})$` }),
  network: t.String({ pattern: `^(${networks})$` }),
  minimumIncome: t.Nullable(t.Integer()),
  minimumCreditScore: t.Nullable(t.Integer()),
});

export type CreditCardDTO = Static<typeof creditCardValidationSchema>;
