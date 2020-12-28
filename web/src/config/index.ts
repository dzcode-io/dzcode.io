import { fsConfig } from "@dzcode.io/common/dist/config";
import { getEnv } from "src/common/utils";

export const fullstackConfig = fsConfig(getEnv(), {
  hostname: location.hostname,
});
