import { Application } from "express";
import expressLoader from "./express-loader";

export default {
  init: async ({ app }: { app: Application }): Promise<void> => {
    await expressLoader({ app });
  },
};
