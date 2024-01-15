import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      dirname: "logs",
      filename: "app.log",
      level: "info",
    }),
  ],
});
