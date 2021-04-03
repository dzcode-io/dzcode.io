import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

export default function expressLoader({ app }: { app: Application }): void {
  app.use(
    cors({
      allowedHeaders:
        process.env.NODE_ENV === "development"
          ? ["http://localhost:8080"]
          : ["https://www.dzcode.io", "https://stage.dzcode.io"],
      origin: true,
    }),
  );
  app.use(morgan("dev"));
  app.use(bodyParser.json());
}
