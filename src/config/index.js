require('dotenv').load();

const {
  NODE_ENV = 'development',
  SERVER_PORT = 4000,
  DB_CLIENT = 'mysql',
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_DATABASE = 'feedly',
  DB_CHARSET = 'utf8',
  DB_USERNAME = 'root',
  DB_PASSWORD = ''
} = process.env;

const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
  NODE_ENV,
  isProduction,
  isDevelopment,
  SERVER_PORT,
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_CHARSET,
  DB_USERNAME,
  DB_PASSWORD
};
