import { fsConfig } from "@dzcode.io/utils/dist/config";
import { getEnv } from "./environment";

export const fullstackConfig = fsConfig(getEnv());
