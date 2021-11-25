import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { RequestHandler, Router } from "express";
import { ConfigService } from "../../config/service";
import { CorsOptions } from "cors";
import { Service } from "typedi";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { ENVDto } from "../../config/dto";

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

    this.router.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      })
    );
  }

  private router = Router();
  private env: ENVDto["NODE_ENV"];
  private whitelist: string[];

  use: RequestHandler = this.router;

  public cors = (): CorsOptions => {
    return {
      origin: (origin, callback) => {
        if (
          !origin ||
          this.whitelist.indexOf(origin) !== -1 ||
          this.env === "development"
        ) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
    };
  };
}
