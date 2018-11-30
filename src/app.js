const express = require('express');
const graphqlHTTP = require('express-graphql');
const { isDevelopment, SERVER_PORT } = require('./config');
const { testDBService } = require('./services/db.service');
const { logger } = require('./services/log.service');
const createSchema = require('./graphql');

async function initServer() {
  let schema;
  try {
    [schema] = await Promise.all([createSchema(), testDBService()]);
  } catch (err) {
    process.exit(1);
  }

  try {
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
