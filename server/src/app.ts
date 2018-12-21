import express from 'express';
import graphqlHTTP from 'express-graphql';
import { isDevelopment, SERVER_PORT } from './config';
import { corsMiddleware } from './middlewares';
import { testDBService } from './services/db.service';
import { logger } from './services/log.service';
import createSchema from './graphql';

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

    app.use('/graphql', corsMiddleware, graphqlServer);

    app.listen(SERVER_PORT);

    logger.info(
      `[App] Server running on http://localhost:${SERVER_PORT}/graphql 🔥`
    );
  } catch (err) {
    throw err;
  }
}

initServer();
