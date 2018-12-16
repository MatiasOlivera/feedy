import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import {
  makeExecutableSchema,
  ITypeDefinitions,
  IResolvers,
  ILogger
} from 'graphql-tools';
import { maskErrors } from 'graphql-errors';
import { logger } from '../services/log.service';
import { GraphQLSchema } from 'graphql';

function mergeTypeDefinitions() {
  const types = fileLoader(path.join(__dirname, '.'), {
    extensions: ['.gql'],
    recursive: true
  });

  return mergeTypes(types, { all: true });
}

function mergeResolverFunctions() {
  const resolvers = fileLoader(path.join(__dirname, '.'), {
    extensions: ['.js'],
    recursive: true
  });

  return mergeResolvers(resolvers);
}

async function createSchema(): Promise<GraphQLSchema> {
  try {
    const typeDefs: ITypeDefinitions = mergeTypeDefinitions();

    const resolvers: IResolvers = mergeResolverFunctions();

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
