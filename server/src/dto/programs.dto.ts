import { type Static, t } from "elysia";
import { Programs } from "../repositories/constants";

const programs: string = Object.keys(Programs).join("|");

export const programsValidationSchema = t.Object({
  id: t.String(),
  program: t.String({ pattern: `^(${programs})$` }),
  point_cash_ratio: t.Number(),
});

export type ProgramsDTO = Static<typeof programsValidationSchema>;
