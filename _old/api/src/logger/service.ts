import { Service } from "typedi";
import winston from "winston";

@Service()
export class LoggerService {
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
      ],
    });
  }

  public log(level: LogLevel, logInfo: LogObject) {
    this.logger.log(level, logInfo.message, logInfo.meta);
  }

  public info(logInfo: LogObject) {
    this.log("info", logInfo);
  }

  public error(logInfo: LogObject) {
    this.log("error", logInfo);
  }

  public debug(logInfo: LogObject) {
    this.log("debug", logInfo);
  }

  public warn(logInfo: LogObject) {
    this.log("warn", logInfo);
  }

  private logger;
}

export type LogLevel = "info" | "error" | "debug" | "warn";
type LogObject = {
  message: string;
  meta?: unknown;
};
