import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { RequestHandler, Router } from "express";
import { serve, setup } from "swagger-ui-express";

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
  constructor() {
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
        description: "swagger documentation for version 2 of dzcode.io API",
        title: "dzcode.io API v2",
        version: "2.0.0",
      },
    });

    this.router.use("/v2/docs", serve, setup(spec));
  }

  private router = Router();

  use: RequestHandler = this.router;
}
