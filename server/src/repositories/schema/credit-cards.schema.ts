import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  uuid,
  text,
} from "drizzle-orm/pg-core";
import { CreditCardIssuer, CreditCardNetwork } from "../constants";
import { programs } from "./programs.schema";

const issuerList = Object.values(CreditCardIssuer)
  .map((v) => `'${v}'`)
  .join(",");
const networkList = Object.values(CreditCardNetwork)
  .map((v) => `'${v}'`)
  .join(",");

export const creditCards = pgTable(
  "creditCards",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    issuer: text("issuer").notNull(),
    network: text("network").notNull(),
    minimumIncome: integer("minimum_income"),
    minimumCreditScore: integer("minimum_credit_score"),
    programId: uuid("program_id").references(() => programs.id),
  },
  (creditCards) => [
    index("network_index").on(creditCards.network),
    check("issuer_check", sql.raw(`issuer IN (${issuerList})`)),
    check("network_check", sql.raw(`network IN (${networkList})`)),
  ]
);

export type CreditCardTable = typeof creditCards;
