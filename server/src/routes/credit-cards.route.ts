import Elysia, { t } from "elysia";
import { createCreditCardHandler,  deleteCreditCardHandler , getCreditCardHandler,  getCreditCardsHandler,  updateCreditCardHandler } from "../controllers/credit-cards.controller";
import { creditCardValidationSchema, createCreditCardSchema, updateCreditCardSchema } from "../dto/credit-cards.dto";

export const creditCardsRoutes = new Elysia({ prefix: "/credit-cards" })
  .get("/", ({ query }) => getCreditCardsHandler(query))
  .get("/:id", ({ params }) => getCreditCardHandler(params.id), {
    params: t.Object({ 
      id: creditCardValidationSchema.properties.id,
    }),
  })
  .post("/", ({ body }) => createCreditCardHandler(body), {
    body: createCreditCardSchema,
  })
  .patch(
    "/:id",
    ({ params, body }) => updateCreditCardHandler(params.id, body),
    {
      body: updateCreditCardSchema,
      params: t.Object({
        id: t.String({ format: "uuid" }),
      }),
    }
  )
  .delete("/:id", ({ params }) => deleteCreditCardHandler(params.id), {
    params: t.Object({
      id: t.String({ format: "uuid" }),
    }),
  });
