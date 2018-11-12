const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { NODE_ENV, isDevelopment, SERVER_PORT } = require('./config');
// eslint-disable-next-line no-unused-vars
const models = require('./models');

const schema = buildSchema(`
  type Query {
    feedback: Feedback
  }

  type Feedback {
    id: ID,
    title: String,
    description: String
  }
`);

const rootValue = {
  feedback: () => ({
    id: 1,
    title: 'Title',
    description: 'Description'
  })
};

const app = express();

const graphqlServer = graphqlHTTP({
  schema,
  rootValue,
  graphiql: isDevelopment
});

app.use('/graphql', graphqlServer);

app.listen(SERVER_PORT);

/* eslint-disable no-console */
console.log(`Environment: ${NODE_ENV}. Listening on port ${SERVER_PORT} `);
