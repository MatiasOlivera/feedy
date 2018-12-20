import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  makeExecutableSchema,
  ITypeDefinitions,
  IResolvers,
  ILogger
} from 'graphql-tools';
import { maskErrors } from 'graphql-errors';
import { logger } from '../services/log.service';
import { GraphQLSchema } from 'graphql';

function mergeResolverFunctions(path: string) {
  const resolvers = fileLoader(join(__dirname, path), {
    extensions: ['.js'],
    recursive: true
  });

  return mergeResolvers(resolvers);
}

async function createSchema(): Promise<GraphQLSchema> {
  try {
    const schemaFilename = 'schema.gql';
    const schemaPath = join(__dirname, schemaFilename);

    if (!existsSync(schemaPath)) {
      logger.error(
        `[gql service] The file ${schemaFilename} doesn't exists. You must generate the schema first.`,
        null,
        () => process.exit()
      );
    }

    const typeDefs: ITypeDefinitions = readFileSync(schemaPath, 'utf8');

    const resolvers: IResolvers = mergeResolverFunctions('.');

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
