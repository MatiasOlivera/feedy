import { existsSync, readFileSync } from 'fs';
import { GraphQLSchema } from 'graphql';
import { maskErrors } from 'graphql-errors';
import { ILogger, IResolvers, ITypeDefinitions, makeExecutableSchema } from 'graphql-tools';
import { join } from 'path';

import { logger } from '../services/log.service';
import resolverDefs from './resolvers';

async function createSchema(): Promise<GraphQLSchema> {
  try {
    const schemaFilename = 'schema.graphql';
    const schemaPath = join(__dirname, schemaFilename);

    if (!existsSync(schemaPath)) {
      logger.error(
        `[gql service] The file ${schemaFilename} doesn't exists. You must generate the schema first.`,
        null,
        () => process.exit()
      );
    }

    const typeDefs: ITypeDefinitions = readFileSync(schemaPath, 'utf8');
    const resolvers = (resolverDefs as unknown) as IResolvers;

    const loggerHandler: ILogger = {
      log: (err) =>
        logger.error('[gql service] Error in a resolver function', {
          error: err
        })
    };

    const schema: GraphQLSchema = makeExecutableSchema({
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

export default createSchema;
