import { Environment } from "../_common/types";
import { fsConfig } from "../_common/config";
export const fullstackConfig = fsConfig(process.env as unknown as Environment);
