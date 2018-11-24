const express = require('express');
const graphqlHTTP = require('express-graphql');
const { isDevelopment, SERVER_PORT } = require('./config');
const { testDBService } = require('./services/db.service');
const { logger } = require('./services/log.service');
const schema = require('./graphql');

async function initServer() {
  try {
    await testDBService();

    const app = express();

    const graphqlServer = graphqlHTTP({
      schema,
      graphiql: isDevelopment
    });

    app.use('/graphql', graphqlServer);

    app.listen(SERVER_PORT);

    logger.info(
      `[App] Server running on http://localhost:${SERVER_PORT}/graphql 🔥`
    );
  } catch (err) {
    throw err;
  }
}

initServer();
