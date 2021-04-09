import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { RequestHandler, Router } from "express";

import { ConfigService } from "../../config/service";
import { Service } from "typedi";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

@Service()
@Middleware({ type: "before" })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  constructor(private configService: ConfigService) {
    this.router.use(helmet());

    this.router.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  private router = Router();

  use: RequestHandler = this.router;

  public cors = () => {
    const env = this.configService.env().ENV;
    return {
      origin:
        env === "development"
          ? ["http://localhost:8080"]
          : env === "staging"
          ? ["https://stage.dzcode.io"]
          : env === "production"
          ? ["https://www.dzcode.io"]
          : true,
    };
  };
}
