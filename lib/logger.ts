import { createLogger, format, transports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import 'winston-daily-rotate-file';

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN!);

const customFormat = ({ isConsole = false }: { isConsole?: Boolean } = {}) => {
  const formatBase = [
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(
      ({ level, message, label = process.env.VERCEL_ENV, timestamp }) =>
        `${timestamp} [${label}] ${level}: ${message}`
    ),
  ];

  if (isConsole) return format.combine(format.colorize(), ...formatBase);

  return format.combine(...formatBase);
};

const getLogger = (fileName = 'application') => {
  const fileLogTransport = new transports.DailyRotateFile({
    filename: `logs/${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: customFormat(),
  });

  const consoleTransport = new transports.Console({
    level: 'info',
    handleExceptions: false,
    format: customFormat({ isConsole: true }),
  });

  const logger = createLogger({
    level: 'info',
    defaultMeta: { service: 'image-to-code' },
    transports: [consoleTransport],
  });

  if (process.env.VERCEL_ENV === 'development') {
    logger.add(fileLogTransport);
  } else {
    logger.add(new LogtailTransport(logtail));
  }

  return logger;
};

export default getLogger();
