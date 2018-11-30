const fs = require('fs');
const path = require('path');
const util = require('util');
const { makeExecutableSchema } = require('graphql-tools');
const { maskErrors } = require('graphql-errors');
const Mutation = require('./mutations');
const Query = require('./queries');
const Types = require('./types');
const Scalars = require('./scalars');
const { logger } = require('../services/log.service');

async function createSchema() {
  try {
    let typeDefs;

    try {
      const readFile = util.promisify(fs.readFile);
      const schemaFile = path.join(__dirname, 'schema.graphql');
      typeDefs = await readFile(schemaFile, 'utf8');
    } catch (err) {
      logger.error('[gql service] Error when reading the schema file', {
        error: err
      });

      throw err;
    }

    const resolvers = {
      Mutation,
      Query,
      ...Types,
      ...Scalars
    };

    const loggerHandler = {
      log: (err) =>
        logger.error('[gql service] Error in a resolver function', {
          error: err
        })
    };

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      logger: loggerHandler
    });

    // Mask the error messages
    maskErrors(schema);

    return schema;
  } catch (err) {
    logger.error('[gql service] Error when creating the schema', {
      error: err
    });

    throw err;
  }
}

module.exports = createSchema;
