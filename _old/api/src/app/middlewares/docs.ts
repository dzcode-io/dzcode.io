import { RequestHandler, Router } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { ConfigService } from "src/config/service";
import { serve, setup } from "swagger-ui-express";
import { Service } from "typedi";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";

import { routingControllersOptions } from "..";

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
