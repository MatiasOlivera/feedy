import { graphql } from 'graphql';

import createSchema from '../..';

async function request(
  query: string,
  variables: Variables,
  context: any
): Promise<any> {
  const schema = await createSchema();
  return graphql(schema, query, null, context, variables);
}

interface Variables {
  [key: string]: any;
}

export default request;
