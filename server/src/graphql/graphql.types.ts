import { GraphQLClient } from 'graphql-request';

import { Prisma } from '../database/prisma-client';

export interface Context {
  db: Prisma;
  client: GraphQLClient;
}
