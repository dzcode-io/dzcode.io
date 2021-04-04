import { ConfigService } from "../../config/service";
import { Container } from "typedi";
import { Loader } from ".";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const env = Container.get(ConfigService).env().ENV;

export const securityLoader: Loader = ({ app }) => {
  app.use(
    cors({
      allowedHeaders:
        env === "development"
          ? ["http://localhost:8080"]
          : env === "staging"
          ? ["https://stage.dzcode.io"]
          : env === "production"
          ? ["https://www.dzcode.io"]
          : [],
      origin: true,
    }),
  );

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
};
