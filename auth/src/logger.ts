import winston from 'winston';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Create a Winston logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
});

export default logger;
