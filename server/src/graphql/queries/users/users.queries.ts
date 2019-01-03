import { QueryResolvers } from '../../resolvers.types';

const user: QueryResolvers.UserResolver = (parent, args, ctx) => {
  return ctx.db.user({ id: args.id });
};

const users: QueryResolvers.UsersResolver = (parent, args, ctx) => {
  return ctx.db.users();
};

export default { Query: { user, users } };
