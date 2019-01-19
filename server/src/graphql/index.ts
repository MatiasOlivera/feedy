import { existsSync, readFileSync } from 'fs';
import { GraphQLSchema } from 'graphql';
import { maskErrors } from 'graphql-errors';
import { ILogger, IResolvers, ITypeDefinitions, makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
import { join } from 'path';

import { logger } from '../services/log.service';

function mergeResolverFunctions(
  path: string,
  directories: string[]
): IResolvers[] {
  const resolvers = directories.map((directory) => {
    return fileLoader(join(__dirname, path, directory), {
      extensions: ['.js'],
      recursive: true
    });
  });

  return mergeResolvers(resolvers);
}

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

    const resolvers: IResolvers[] = mergeResolverFunctions('.', [
      'queries',
      'mutations',
      'types',
      'scalars',
      'unions'
    ]);

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
