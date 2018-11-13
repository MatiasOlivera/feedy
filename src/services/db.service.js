const Knex = require('knex');
const { Model } = require('objection');
const {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_CHARSET,
  DB_USERNAME,
  DB_PASSWORD
} = require('../config');

function initDBService() {
  // Create a new knex instance
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

  return knex
    .raw('select true')
    .then(() => {
      // Bind all models to a knex instance
      Model.knex(knex);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}

module.exports = initDBService;
