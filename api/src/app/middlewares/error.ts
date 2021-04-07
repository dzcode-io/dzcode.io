import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";

import { ErrorRequestHandler } from "express";
import { GeneralResponseDto } from "../types";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error: ErrorRequestHandler<never, GeneralResponseDto, unknown> = (
    err,
    req,
    res,
    next,
  ) => {
    // Logs error
    console.log("🚩 Internal Server Error");
    console.log(err);

    // Skip if headers are already sent
    if (res.headersSent) {
      return next(err);
    }

    // return a general error response
    res.status(500).json({
      code: 500,
      msg: err.message,
    });
  };
}
