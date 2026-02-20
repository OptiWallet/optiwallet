import { type Static, t } from "elysia";
import { Programs } from "../repositories/constants";

const programs: string = Object.keys(Programs).join("|");

export const programsValidationSchema = t.Object({
  id: t.String({ format: "uuid" }),
  program: t.String({ pattern: `^(${programs})$` }),
  pointCashRatio: t.Number(),
});

export type ProgramsDTO = Static<typeof programsValidationSchema>;
