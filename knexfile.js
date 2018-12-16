const {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_CHARSET,
  DB_USERNAME,
  DB_PASSWORD
} = require('./dist/config');

const configuration = {
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    charset: DB_CHARSET,
    user: DB_USERNAME,
    password: DB_PASSWORD
  },
  migrations: {
    directory: './dist/database/migrations',
    tableName: 'migrations'
  },
  seeds: {
    directory: './dist/database/seeders'
  }
};

module.exports = configuration;
