import Elysia from "elysia";
import {
  createCreditCard,
  deleteCreditCard,
  getCreditCard,
  getCreditCards,
  updateCreditCard,
} from "../controller/creditCards/creditCards.controller";
import { creditCardSchema } from "../data/schema/creditCards.schema";

export const creditCardsRoutes = new Elysia({ prefix: "/credit-cards" })
  .get("/", () => getCreditCards())
  .get("/:id", ({ params }) => getCreditCard(params.id), creditCardSchema)
  .post("/", ({ body }) => createCreditCard(body))
  .patch("/:id", ({ params, body }) => updateCreditCard(params.id, body))
  .delete("/:id", ({ params }) => deleteCreditCard(params.id));
