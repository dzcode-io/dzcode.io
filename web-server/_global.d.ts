/// <reference types="@rsbuild/core/types" />

import { Environment } from "@dzcode.io/utils/dist/config/environment";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STAGE: Environment;
    }
  }
}
