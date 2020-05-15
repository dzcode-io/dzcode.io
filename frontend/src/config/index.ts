import { fsConfig } from "../../../fullstack/dist/config";
import { getEnv } from "src/common/utils";

export const fullstackConfig = fsConfig(getEnv());
