import Elysia, { t } from "elysia";
import { createCreditCard, deleteCreditCard, getCreditCard, getCreditCards, updateCreditCard } from "../controllers/credit-cards.controller";
import { creditCardValidationSchema } from "../dto/credit-cards.dto";

export const creditCardsRoutes = new Elysia({ prefix: "/credit-cards" })
  .get("/", ({ query }) => getCreditCards(query))
  .get("/:id", ({ params }) => getCreditCard(params.id))
  .post("/", ({ body }) => createCreditCard(body), { body: creditCardValidationSchema })
  .patch("/:id", ({ params, body }) => updateCreditCard(params.id, body), {
    body: t.Partial(creditCardValidationSchema),
  })
  .delete("/:id", ({ params }) => deleteCreditCard(params.id));
