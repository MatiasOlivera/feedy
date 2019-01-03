import { QueryResolvers } from '../../resolvers.types';

const Query: QueryResolvers.Type = {
  issue: (parent, args, ctx) => {
    return ctx.db.issue({ id: args.id });
  },

  issues: (parent, args, ctx) => {
    return ctx.db.issues();
  }
};

export default { Query };
