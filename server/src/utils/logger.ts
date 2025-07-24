import { isProduction } from "elysia/error";
import pino from "pino";

export const loggerConfig = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  ...(isProduction ? {} : loggerConfig),
});
