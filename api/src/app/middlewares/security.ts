import { CorsOptions } from "cors";
import { RequestHandler, Router } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { ConfigService } from "src/config/service";
import { EnvRecord } from "src/config/types";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before" })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  constructor(private configService: ConfigService) {
    this.env = this.configService.env().NODE_ENV;
    this.whitelist =
      this.env === "staging"
        ? ["https://stage.dzcode.io"]
        : this.env === "production"
          ? ["https://www.dzcode.io"]
          : [];

    this.router.use(helmet());

    if (this.env !== "development")
      this.router.use(
        rateLimit({
          windowMs: 1 * 60 * 1000, // 1 minute
          max: 1000, // limit each IP to 1000 requests per windowMs
        }),
      );
  }

  private router = Router();
  private env: EnvRecord["NODE_ENV"];
  private whitelist: string[];

  use: RequestHandler = this.router;

  public cors = (): CorsOptions => {
    return {
      origin: (origin, callback) => {
        if (!origin || this.whitelist.indexOf(origin) !== -1 || this.env === "development") {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
    };
  };
}
