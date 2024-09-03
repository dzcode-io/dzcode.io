import { fsConfig } from "@dzcode.io/utils/dist/config";
import { getEnv } from "src/utils/environment";

export const fullstackConfig = fsConfig(getEnv(), {
  hostname: location.hostname,
});
