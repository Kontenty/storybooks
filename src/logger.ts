import pino from "pino";
import pinoExpress from "express-pino-logger";
import { Request, Response } from "express";

const logger = pino({
  level: process.env.LOGEL_LEVEL || "info",
});

const serializers = {
  req: (req: Request) => {
    return {
      method: req.method,
      url: req.url,
      version: req.headers["accept-version"],
      hostname: req.hostname,
      remoteAddress: req.ip,
    };
  },
  err: pino.stdSerializers.err,
  res: (reply: Response) => {
    return {
      statusCode: reply.statusCode,
    };
  },
};

export const expressLogger = pinoExpress({
  logger,
  serializers,
});

export default logger;
