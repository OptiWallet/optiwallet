import { logger as elysiaLogger } from "@bogeychan/elysia-logger";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { creditCardsRoutes } from "./routes/credit-cards.route";
import { logger, loggerConfig } from "./utils/logger";
import { isProduction } from "./utils/evnironment";

const app = new Elysia().use(helmet()).use(elysiaLogger(loggerConfig));
if (!isProduction) {
  app.use(swagger());
}

app
  .group("/api", (api) => api.use(creditCardsRoutes))
  .listen(process.env.PORT || 3000);

logger.info(
  `👛 Optiwallet server is running at ${app.server?.hostname}:${app.server?.port}`
);
