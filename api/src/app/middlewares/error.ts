import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { ErrorRequestHandler } from "express";
import { GeneralResponseDto } from "../types";
import { LoggerService } from "../../logger/service";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(private loggerService: LoggerService) {}

  error: ErrorRequestHandler<never, GeneralResponseDto, unknown> = (
    err,
    req,
    res,
    next,
  ) => {
    // Logs error
    this.loggerService.error({
      message: "Internal Server Error",
      error: err?.message,
    });

    // Skip if headers are already sent
    if (res.headersSent) {
      return next(err);
    }

    // return a general error response
    return res.status(500).json({
      code: 500,
      msg: err?.message,
    });
  };
}
