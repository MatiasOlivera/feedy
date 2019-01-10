import { UserWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';

const user: QueryResolvers.UserResolver = (parent, args, ctx) => {
  return ctx.db.user({ id: args.id });
};

const users: QueryResolvers.UsersResolver = (parent, args, ctx) => {
  const { search } = args;

  const where: UserWhereInput = search ? { username_contains: search } : {};

  return ctx.db.users({
    where
  });
};

export default { Query: { user, users } };
