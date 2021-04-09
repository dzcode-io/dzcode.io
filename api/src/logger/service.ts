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
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  public log(level: LogLevel, logInfo: LogObject) {
    this.logger.log(level, logInfo.message, { ...logInfo, message: undefined });
  }

  public info(logInfo: LogObject) {
    this.logger.log("info", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  public error(logInfo: LogObject) {
    this.logger.log("error", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  public debug(logInfo: LogObject) {
    this.logger.log("debug", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  public warn(logInfo: LogObject) {
    this.logger.log("warn", logInfo.message, {
      ...logInfo,
      message: undefined,
    });
  }

  private logger;
}

export type LogLevel = "info" | "error" | "debug" | "warn";
type LogObject = {
  message: string;
  [key: string]: unknown;
};
