import { Prisma } from '../database/prisma-client';

export interface Context {
  db: Prisma;
}
