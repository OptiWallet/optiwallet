import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { creditCardsRoutes } from "./routes/credit-cards.route";

const app = new Elysia().use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(swagger());
}

app
  .group("/api", (api) => api.use(creditCardsRoutes))
  .listen(process.env.PORT || 3000);

console.log(
  `👛 Optiwallet server is running at ${app.server?.hostname}:${app.server?.port}`
);
