import { RequestHandler } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { LoggerService, LogLevel } from "src/logger/service";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  use: RequestHandler = (req, res, next) => {
    let logLevel: LogLevel = "info";
    const { statusCode } = res;
    if (statusCode < 100 && statusCode >= 400) {
      logLevel = "error";
    }

    this.loggerService.log(logLevel, {
      message: `${res.statusCode} ${req.method} ${req.url}`,
    });
    next();
  };
}
