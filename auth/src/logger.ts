import winston from 'winston';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

const getLogLevel = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'error';

    case 'test':
      return 'none';

    default:
      return 'debug';
  }
};
const level = getLogLevel();

// Create a Winston logger instance
const logger = winston.createLogger({
  level,
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ message }) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `[${Date.now()}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
});

export default logger;
