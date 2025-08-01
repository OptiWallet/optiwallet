import { type Static, t } from "elysia";

export const cashbackValidationSchema = t.Object({
  id: t.String(),
  category: t.String(),
  value: t.Number(),
  credit_card_id: t.String(),
  program_id: t.String(),
});

export type CashbackDTO = Static<typeof cashbackValidationSchema>;
