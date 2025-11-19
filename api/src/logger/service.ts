import { Service } from "typedi";
import {
  Logger,
  New,
  MultiHandler,
  PrettyHandler,
  ColorHandler,
  JSONHandler,
  FileHandler,
  Level,
} from "@omdxp/jslog";
import * as path from "path";
import * as fs from "fs";

@Service()
export class LoggerService {
  private _logger: Logger;
  private fileHandler?: FileHandler;

  constructor() {
    const isDev = process.env.NODE_ENV === "development";
    const logDir = path.join(process.cwd(), "logs");

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    if (isDev) {
      const devHandler = new PrettyHandler({
        handler: new ColorHandler({
          level: Level.DEBUG,
          addSource: true,
        }),
        indent: 2,
        compactArrays: true,
      });
      this._logger = New(devHandler);
    } else {
      this.fileHandler = new FileHandler({
        filepath: path.join(logDir, "api.log"),
        maxSize: 50 * 1024 * 1024,
        maxFiles: 10,
        format: "json",
        level: Level.INFO,
        addSource: false,
      });

      const productionHandler = new MultiHandler([
        new JSONHandler({ level: Level.INFO }),
        this.fileHandler,
      ]);

      this._logger = New(productionHandler);
    }
  }

  public get logger(): Logger {
    return this._logger;
  }

  public close(): void {
    if (this.fileHandler) {
      this.fileHandler.close();
    }
  }
}
