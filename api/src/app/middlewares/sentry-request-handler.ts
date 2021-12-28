import * as Sentry from "@sentry/node";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { RequestHandler } from "express";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before", priority: 0 })
export class SentryRequestHandlerMiddleware implements ExpressMiddlewareInterface {
  use: RequestHandler = Sentry.Handlers.requestHandler();
}
