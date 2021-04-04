import { Loader } from ".";
import router from "../routes";

export const controllerLoader: Loader = ({ app }) => {
  app.use(router);
};
