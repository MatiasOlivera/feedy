require('dotenv').load();

const { NODE_ENV = 'development', SERVER_PORT = 4000 } = process.env;

const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
  NODE_ENV,
  isProduction,
  isDevelopment,
  SERVER_PORT
};
