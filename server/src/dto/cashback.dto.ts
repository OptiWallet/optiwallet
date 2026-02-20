import { type Static, t } from "elysia";

export const cashbackValidationSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  category: t.String(),
  value: t.Number(),
  creditCardId: t.String({ format: 'uuid' }),
  programId: t.String({ format: 'uuid' }),
});

export type CashbackDTO = Static<typeof cashbackValidationSchema>;
