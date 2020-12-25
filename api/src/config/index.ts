import { Environment } from "@dzcode.io/common/dist/types";
import { fsConfig } from "@dzcode.io/common/dist/config";
export const fullstackConfig = fsConfig(
  (process.env as unknown) as Environment,
);
