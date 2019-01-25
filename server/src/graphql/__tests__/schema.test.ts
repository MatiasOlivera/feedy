import { readFileSync } from 'fs';
import gql from 'gql-tag';
import { addMockFunctionsToSchema, makeExecutableSchema, mockServer } from 'graphql-tools';
import { join } from 'path';

import resolvers from '../resolvers';

describe('Schema', () => {
  const typeDefs = readFileSync(join(__dirname, '../schema.graphql'), 'utf8');
  const options: { typeDefs: string; resolvers: any } = { typeDefs, resolvers };

  const schema = makeExecutableSchema(options);
  addMockFunctionsToSchema({ schema });

  const server = mockServer(typeDefs, {});

  test('has valid type definitions', async () => {
    const schemaQuery = async () =>
      server.query(gql`
        query {
          __schema {
            types {
              name
            }
            queryType {
              name
            }
            mutationType {
              name
            }
            subscriptionType {
              name
            }
            directives {
              name
            }
          }
        }
      `);

    expect(schemaQuery).not.toThrow();
    expect(await schemaQuery()).toMatchSnapshot();
  });
});
