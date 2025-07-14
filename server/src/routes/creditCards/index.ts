import Elysia from "elysia";
import {
  createCreditCard,
  deleteCreditCard,
  getCreditCard,
  getCreditCards,
  updateCreditCard,
} from "./handlers";

export const creditCardsRoutes = new Elysia({ prefix: "/credit-cards" })
  .get("/", () => getCreditCards)
  .get("/:id", ({ params }) => getCreditCard(params.id))
  .post("/", ({ body }) => createCreditCard(body))
  .patch("/:id", ({ params, body }) => updateCreditCard(params.id, body))
  .delete("/:id", ({ params }) => deleteCreditCard(params.id));
