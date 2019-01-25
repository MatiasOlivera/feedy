import { readFileSync } from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import { join } from 'path';

import resolvers from '../resolvers';

describe('Schema', () => {
  test('should be a valid GraphQL Schema', async () => {
    const typeDefs = readFileSync(join(__dirname, '../schema.graphql'), 'utf8');
    const options: Options = { typeDefs, resolvers };
    const schema = () => makeExecutableSchema(options);

    expect(schema).not.toThrow();
    expect(typeDefs).toMatchSnapshot();
  });
});

interface Options {
  typeDefs: string;
  resolvers: any;
}
