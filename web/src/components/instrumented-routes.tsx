import { Routes as ReactRouterRoutes } from "react-router-dom";

import { FaroRoutes } from "@grafana/faro-react";
import { getEnv } from "src/utils/environment";

const env = getEnv();

export const Routes = env === "development" ? ReactRouterRoutes : FaroRoutes;
