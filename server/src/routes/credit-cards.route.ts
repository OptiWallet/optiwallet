import Elysia, { t } from "elysia";
import { creditCardSchema } from "../dto/credit-cards.dto";
import { createCreditCard, deleteCreditCard, getCreditCard, getCreditCards, updateCreditCard } from "../controllers/credit-cards.controller";

export const creditCardsRoutes = new Elysia({ prefix: "/credit-cards" })
  .get("/", ({ query }) => getCreditCards(query))
  .get("/:id", ({ params }) => getCreditCard(params.id))
  .post("/", ({ body }) => createCreditCard(body), { body: creditCardSchema })
  .patch("/:id", ({ params, body }) => updateCreditCard(params.id, body), {
    body: t.Partial(creditCardSchema),
  })
  .delete("/:id", ({ params }) => deleteCreditCard(params.id));
