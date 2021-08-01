import { Environment } from "../.common/types";
import { fsConfig } from "../.common/config";
export const fullstackConfig = fsConfig(process.env as unknown as Environment);
