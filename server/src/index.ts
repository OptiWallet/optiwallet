import { logger as elysiaLogger } from "@bogeychan/elysia-logger";
import swagger from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { creditCardsRoutes } from "./routes/credit-cards.route";
import { programsRoutes } from "./routes/programs.route";
import { logger, loggerConfig } from "./utils/logger";
import { isProduction } from "./utils/evnironment";

const app = new Elysia()
  .use(cors())
  .use(helmet())
  .use(elysiaLogger(loggerConfig));

if (!isProduction) {
  app.use(swagger());
}

app
  .group("/api", (api) => api.use(creditCardsRoutes).use(programsRoutes))
  .listen(process.env.PORT || 3001);

logger.info(
  `👛 Optiwallet server is running at ${app.server?.hostname}:${app.server?.port}`
);
