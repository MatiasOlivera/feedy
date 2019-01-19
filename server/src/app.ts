import express from 'express';
import graphqlHTTP from 'express-graphql';

import env from './config';
import { prisma as db } from './database/prisma-client';
import createSchema from './graphql';
import { corsMiddleware } from './middlewares';
import { logger } from './services/log.service';

async function initServer() {
  let schema;
  try {
    schema = await createSchema();
  } catch (err) {
    process.exit(1);
  }

  try {
    const app = express();

    const graphqlServer = graphqlHTTP({
      schema,
      graphiql: env.isDevelopment,
      context: { db }
    });

    app.use('/graphql', corsMiddleware, graphqlServer);

    app.listen(env.SERVER_PORT);

    logger.info(
      `[App] Server running on http://localhost:${env.SERVER_PORT}/graphql 🔥`
    );
  } catch (err) {
    throw err;
  }
}

initServer();
