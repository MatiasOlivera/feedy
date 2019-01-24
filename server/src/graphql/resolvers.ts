/* eslint-disable import/no-unresolved */
import mutationsResolvers from './mutations';
import queriesResolvers from './queries';
import {
  CommentResolvers,
  IssueResolvers,
  MutationResolvers,
  OrganizationResolvers,
  ProductResolvers,
  QueryResolvers,
  UserResolvers,
} from './resolvers.types';
import scalars from './scalars';
import types from './types';
import unions from './unions';

const mutations: MutationResolvers.Type = {
  ...mutationsResolvers.comments,
  ...mutationsResolvers.issues,
  ...mutationsResolvers.organizations,
  ...mutationsResolvers.products,
  ...mutationsResolvers.users
};

const queries: QueryResolvers.Type = {
  ...queriesResolvers.comments,
  ...queriesResolvers.issues,
  ...queriesResolvers.organizations,
  ...queriesResolvers.products,
  ...queriesResolvers.users
};

export const resolvers: Resolvers = {
  Mutation: mutations,
  Query: queries,
  ...scalars,
  ...types,
  ...unions
};

export interface Resolvers {
  Mutation: MutationResolvers.Type;
  Query: QueryResolvers.Type;

  // Scalars
  Date: any;

  // Types
  Comment: CommentResolvers.Type;
  Issue: IssueResolvers.Type;
  Organization: OrganizationResolvers.Type;
  Product: ProductResolvers.Type;
  User: UserResolvers.Type;

  // Unions
  ProductOwner: any;
}

export default resolvers;
