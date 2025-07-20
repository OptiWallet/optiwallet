import {
  check,
  index,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { t, TSchema } from "elysia";
import { CreditCardIssuer, CreditCardNetwork } from "../constants";
import { sql } from "drizzle-orm";
import { Static } from "elysia";

const issuerList = Object.values(CreditCardIssuer)
  .map((v) => `'${v}'`)
  .join(",");
const networkList = Object.values(CreditCardNetwork)
  .map((v) => `'${v}'`)
  .join(",");

export const creditCardsTable = pgTable(
  "creditCards",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    issuer: text("issuer").notNull(),
    network: text("network").notNull(),
    minimumIncome: integer("minimum_income"),
    minimumCreditScore: integer("minimum_credit_score"),
  },
  (creditCards) => [
    index("network_index").on(creditCards.network),
    check("issuer_check", sql.raw(`issuer IN (${issuerList})`)),
    check("network_check", sql.raw(`network IN (${networkList})`)),
  ]
);

const networks: string = Object.keys(CreditCardNetwork).join("|");
const issuers: string = Object.keys(CreditCardIssuer).join("|");

export const creditCardSchema: TSchema = t.Object({
  id: t.Optional(t.Integer()),
  name: t.String({ minLength: 3 }),
  issuer: t.String({ pattern: `^(${issuers})$` }),
  network: t.String({ pattern: `^(${networks})$` }),
  minimumIncome: t.Optional(t.Integer()),
  minimumCreditScore: t.Optional(t.Integer()),
});

export type CreditCard = Static<typeof creditCardSchema>;
