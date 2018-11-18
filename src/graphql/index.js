const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const Query = require('./queries');
const Types = require('./types');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const resolvers = {
  Query,
  ...Types
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
