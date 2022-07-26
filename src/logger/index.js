const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf , errors, json} = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  // remove level in case of production
  level: "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json(),
  ),
  defaultMeta: { service: 'staff-scheduling'},
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    // FOR Local console
    //new transports.Console(),
  ],
});

module.exports = logger;
