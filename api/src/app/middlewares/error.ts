import { ErrorRequestHandler } from "express";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { GeneralResponse } from "src/app/types";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  error: ErrorRequestHandler<never, GeneralResponse, unknown> = (err, req, res, next) => {
    // Logs error
    this.loggerService.error({
      message: "Internal Server Error",
      meta: err,
    });

    // Skip if headers are already sent
    if (res.headersSent) {
      return next(err);
    }

    // return a general error response
    return res.status(500).json({
      code: 500,
      msg: "Internal Server Error",
    });
  };
}
