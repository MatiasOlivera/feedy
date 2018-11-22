const path = require('path');
const { createLogger, format, transports } = require('winston');
const { isProduction } = require('../config');

const dirname = './logs';

const commonOptions = {
  level: 'silly',
  exitOnError: false
};

const errorFormat = format((info) => {
  if (info instanceof Error) {
    return { ...info, message: info.message, stack: info.stack || null };
  }

  if (info.message instanceof Error) {
    return {
      ...info,
      message: info.message.message,
      stack: info.message.stack || null
    };
  }

  return info;
});

const errorMetadataFormat = format((info) => {
  if (info.error && info.error instanceof Error) {
    return {
      message: info.message,
      stack: info.error.stack || null
    };
  }

  return info;
});

const consoleFormat = (info) => {
  const { level, message, timestamp, metadata, stack = '' } = info;

  const meta = JSON.stringify(metadata);
  const log = `${timestamp} - ${level}: ${message} ${meta}
  ${stack}`;

  return log;
};

const commonFormats = [
  format.metadata(),
  format.timestamp(),
  errorFormat(),
  errorMetadataFormat()
];

const productionOptions = {
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

const developmentOptions = {
  ...commonOptions,

  format: format.combine(...commonFormats),

  transports: [
    new transports.Console({
      format: format.combine(format.cli(), format.printf(consoleFormat)),
      handleExceptions: true
    })
  ]
};

const options = isProduction ? productionOptions : developmentOptions;
const logger = createLogger(options);

module.exports = { logger };
