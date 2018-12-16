import path from 'path';
import {
  createLogger,
  format,
  transports,
  LogEntry,
  LoggerOptions,
  Logger
} from 'winston';
import { isProduction } from '../config';
import { Format } from 'logform';

interface CustomLogEntry extends LogEntry {
  stack: string;
  timestamp: string;
  error?: Error;
}

const dirname: string = './logs';

const commonOptions: LoggerOptions = {
  level: 'silly',
  exitOnError: false
};

const errorFormat = format((info: CustomLogEntry) => {
  if (info instanceof Error) {
    return { ...info, message: info.message, stack: info.stack || null };
  }

  return info;
});

const errorMetadataFormat = format((info: CustomLogEntry) => {
  if (info.error && info.error instanceof Error) {
    return {
      ...info,
      message: info.message,
      stack: info.error.stack || null
    };
  }

  return info;
});

const consoleFormat = (info: CustomLogEntry): string => {
  const { level, message, timestamp, metadata, stack = '' } = info;

  const meta = JSON.stringify(metadata);
  const log = `${timestamp} - ${level}: ${message} ${meta}
  ${stack}`;

  return log;
};

const commonFormats: Format[] = [
  format.metadata(),
  format.timestamp(),
  errorFormat(),
  errorMetadataFormat()
];

const productionOptions: LoggerOptions = {
  ...commonOptions,

  format: format.combine(...commonFormats, format.logstash()),

  transports: [
    new transports.File({
      level: 'error',
      filename: path.join(dirname, 'errors.log')
    }),

    new transports.File({
      filename: path.join(dirname, 'all.log')
    })
  ],

  exceptionHandlers: [
    new transports.File({
      filename: path.join(dirname, 'exceptions.log')
    })
  ]
};

const developmentOptions: LoggerOptions = {
  ...commonOptions,

  format: format.combine(...commonFormats),

  transports: [
    new transports.Console({
      format: format.combine(format.cli(), format.printf(consoleFormat)),
      handleExceptions: true
    })
  ]
};

const options: LoggerOptions = isProduction
  ? productionOptions
  : developmentOptions;
const logger: Logger = createLogger(options);

export { logger };
