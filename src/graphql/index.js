const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { maskErrors } = require('graphql-errors');
const Query = require('./queries');
const Types = require('./types');
const Scalars = require('./scalars');
const { logger } = require('../services/log.service');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const resolvers = {
  Query,
  ...Types,
  ...Scalars
};

const loggerHandler = {
  log: (err) =>
    logger.error('[gql service] Error in a resolver function', { error: err })
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: loggerHandler
});

// Mask the error messages
maskErrors(schema);

module.exports = schema;
