import { drizzle } from "drizzle-orm/bun-sql";
import * as creditCardSchema from "./schema/credit-cards.schema";
export const db = drizzle(process.env.DATABASE_URL ?? "", {
  schema: {
    ...creditCardSchema,
  },
});
