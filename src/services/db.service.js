const Knex = require('knex');
const Bookshelf = require('bookshelf');
const {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_CHARSET,
  DB_USERNAME,
  DB_PASSWORD
} = require('../config');

const knex = Knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    charset: DB_CHARSET,
    user: DB_USERNAME,
    password: DB_PASSWORD
  }
});

const bookshelf = Bookshelf(knex);
bookshelf.plugin(['registry', 'pagination', 'bookshelf-camelcase']);

module.exports = bookshelf;
