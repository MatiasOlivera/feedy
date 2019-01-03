import { QueryResolvers } from '../../resolvers.types';

const Query: QueryResolvers.Type = {
  user: (parent, args, ctx) => {
    return ctx.db.user({ id: args.id });
  },

  users: (parent, args, ctx) => {
    return ctx.db.users();
  }
};

export default { Query };