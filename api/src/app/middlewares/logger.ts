import { RequestHandler } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";
import { HttpReq, HttpRes, Level } from "@omdxp/jslog";

@Service()
@Middleware({ type: "after" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  use: RequestHandler = (req, res, next) => {
    let logLevel = Level.INFO;
    const { statusCode } = res;

    if (statusCode >= 500) {
      logLevel = Level.ERROR;
    } else if (statusCode >= 400) {
      logLevel = Level.WARN;
    } else if (statusCode >= 300) {
      logLevel = Level.DEBUG;
    }

    const logger = this.loggerService.logger;
    const message = `${req.method} ${req.url}`;

    const requestAttrs = HttpReq({
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const responseAttrs = HttpRes({
      status: statusCode,
    });

    const logAttrs = [...requestAttrs, ...responseAttrs];

    logger.log(logLevel, message, ...logAttrs);

    next();
  };
}
