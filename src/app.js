const express = require('express');
const graphqlHTTP = require('express-graphql');
const { isDevelopment, SERVER_PORT } = require('./config');
const initDBService = require('./services/db.service');
const schema = require('./graphql');

async function initServer() {
  try {
    await initDBService();

    const app = express();

    const graphqlServer = graphqlHTTP({
      schema,
      graphiql: isDevelopment
    });

    app.use('/graphql', graphqlServer);

    app.listen(SERVER_PORT);

    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${SERVER_PORT}/graphql 🔥`);
  } catch (err) {
    throw err;
  }
}

initServer();
