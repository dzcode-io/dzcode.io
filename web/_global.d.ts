/// <reference types="@rsbuild/core/types" />

import { Environment } from "@dzcode.io/utils/dist/config/environment";

declare global {
  interface Window {
    bundleInfo: {
      version: string;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      STAGE: Environment;
    }
  }
}
