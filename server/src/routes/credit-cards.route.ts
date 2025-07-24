import Elysia, { t } from "elysia";
import { createCreditCardHandler,  deleteCreditCardHandler , getCreditCardHandler,  getCreditCardsHandler,  updateCreditCardHandler } from "../controllers/credit-cards.controller";
import { creditCardValidationSchema } from "../dto/credit-cards.dto";

export const creditCardsRoutes = new Elysia({ prefix: "/credit-cards" })
  .get("/", ({ query }) => getCreditCardsHandler(query))
  .get("/:id", ({ params }) => getCreditCardHandler(Number(params.id)), {
    params: t.Object({ 
      id: creditCardValidationSchema.properties.id,
    }),
  })
  .post("/", ({ body }) => createCreditCardHandler(body), {
   
    body: creditCardValidationSchema,
  })
  .patch(
    "/:id",
    ({ params, body }) => updateCreditCardHandler(Number(params.id), body),
    {
      body: t.Partial(creditCardValidationSchema),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete("/:id", ({ params }) => deleteCreditCardHandler(Number(params.id)), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });
