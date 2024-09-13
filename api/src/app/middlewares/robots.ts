import { RequestHandler } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
const robots = require("express-robots-txt"); // eslint-disable-line @typescript-eslint/no-require-imports

@Service()
@Middleware({ type: "before", priority: 0 })
export class RobotsMiddleware implements ExpressMiddlewareInterface {
  use: RequestHandler = robots({ UserAgent: "*", Disallow: "/docs" });
}
