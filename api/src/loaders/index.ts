import { Application } from "express";
import expressLoader from "./express-loader";

export default {
  init({ app }: { app: Application }): void {
    expressLoader({ app });
  },
};
