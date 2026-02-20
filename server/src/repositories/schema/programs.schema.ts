import { real, pgTable, text, check, uuid } from "drizzle-orm/pg-core";
import { Programs } from "../constants";
import { sql } from "drizzle-orm";

const programsList = Object.values(Programs)
  .map((v) => `'${v}'`)
  .join(",");

export const programs = pgTable(
  "programs",
  {
    id: uuid("id").primaryKey(),
    program: text("program").notNull(),
    point_cash_ratio: real("point_cash_ratio").notNull().default(1),
  },
  () => [check("program", sql.raw(`program IN (${programsList})`))]
);

export type ProgramsTable = typeof programs;
