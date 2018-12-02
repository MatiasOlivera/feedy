const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const { makeExecutableSchema } = require('graphql-tools');
const { maskErrors } = require('graphql-errors');
const { logger } = require('../services/log.service');

function mergeTypeDefinitions() {
  const types = fileLoader(path.join(__dirname, '.'), {
    extensions: ['.gql'],
    recursive: true
  });

  return mergeTypes(types, { all: true });
}

async function createSchema() {
  try {
    const typeDefs = mergeTypeDefinitions();

    const resolvers = {};

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
