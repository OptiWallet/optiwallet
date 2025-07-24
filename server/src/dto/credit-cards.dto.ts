import { Static, t } from "elysia";
import { CreditCardIssuer, CreditCardNetwork } from "../repositories/constants";

const networks: string = Object.keys(CreditCardNetwork).join("|");
const issuers: string = Object.keys(CreditCardIssuer).join("|");

export const creditCardSchema = t.Object({
  id: t.Integer(),
  name: t.String({ minLength: 3 }),
  issuer: t.String({ pattern: `^(${issuers})$` }),
  network: t.String({ pattern: `^(${networks})$` }),
  minimumIncome: t.Optional(t.Integer()),
  minimumCreditScore: t.Optional(t.Integer()),
});

export type CreditCardDTO = Static<typeof creditCardSchema>;
