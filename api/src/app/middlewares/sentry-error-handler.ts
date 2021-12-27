import * as Sentry from "@sentry/node";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { RequestHandler } from "express";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class SentryErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error: RequestHandler =
    Sentry.Handlers.errorHandler() as unknown as SentryErrorHandlerMiddleware["error"];
}
