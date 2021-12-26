import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { RequestHandler, Router } from "express";
import { serve, setup } from "swagger-ui-express";

import { ConfigService } from "../../config/service";
import { Service } from "typedi";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersOptions } from "..";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

@Service()
@Middleware({ type: "after" })
export class DocsMiddleware implements ExpressMiddlewareInterface {
  constructor(private configService: ConfigService) {
    // Parse class-validator classes into JSON Schema:
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
      classTransformerMetadataStorage: defaultMetadataStorage,
    });
    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: { schemas },
      info: {
        description: "Swagger documentation for dzcode.io API",
        title: "dzcode.io API",
        version: configService.env().BUNDLE_INFO.version,
      },
    });

    this.router.use("/docs", serve, setup(spec));
  }

  private router = Router();

  use: RequestHandler = this.router;
}
