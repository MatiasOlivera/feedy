const Knex = require('knex');
const { Model } = require('objection');
const _ = require('lodash');
const { UserError } = require('graphql-errors');
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

/**
 * Get the page number from index 0
 * @param {number} page The page
 * @returns {number} The index of the page
 * @see https://vincit.github.io/objection.js/#page
 */
function getPage(page) {
  return page - 1;
}

/**
 * Convert the column name to snake_case
 * @param {string} column The column name
 */
function getColumn(column) {
  return _.snakeCase(column);
}

/**
 * Checks if the column exists in the model
 * @param {array} columns The table's columns
 * @param {string} column The column name
 * @returns It's a valid column
 */
function validateColumn(columns, column) {
  if (columns && _.isArray(columns)) {
    return columns.includes(column);
  }
  return false;
}

function validatePaginationArgs(page, limit, { column, columns }) {
  try {
    if (page < 1) {
      throw new UserError('Page must be a positive integer');
    }

    if (limit < 1) {
      throw new UserError('Limit must be a positive integer');
    }

    const isValidColumn = validateColumn(columns, column);
    if (!isValidColumn) {
      throw new UserError('OrderBy must be a valid object property');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  testDBService,
  knex,
  validatePaginationArgs,
  getColumn,
  getPage
};
