import * as Sentry from "@sentry/node";
import { RequestHandler } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before", priority: 0 })
export class SentryRequestHandlerMiddleware implements ExpressMiddlewareInterface {
  use: RequestHandler = Sentry.Handlers.requestHandler();
}
