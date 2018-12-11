const Knex = require('knex');
const { Model } = require('objection');
const { logger } = require('./log.service');
const {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_CHARSET,
  DB_USERNAME,
  DB_PASSWORD
} = require('../config');

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

// Bind all models to a knex instance
Model.knex(knex);

function testDBService() {
  return knex
    .raw('select true')
    .then(() => {
      logger.info('[db service] Database connection was successful.');
    })
    .catch((err) => {
      if (err.code === 'ECONNREFUSED') {
        logger.error('[db service] Database connection was refused.', {
          error: err
        });
      } else {
        logger.error(
          '[db service] There was a problem with the database connection.',
          { error: err }
        );
      }

      throw err;
    });
}

module.exports = {
  testDBService,
  knex
};
