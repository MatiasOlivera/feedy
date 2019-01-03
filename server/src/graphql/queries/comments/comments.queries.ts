import { QueryResolvers } from '../../resolvers.types';

const Query: QueryResolvers.Type = {
  comment: (parent, args, ctx) => {
    return ctx.db.comment({ id: args.id });
  },

  comments: (parent, args, ctx) => {
    return ctx.db.comments();
  }
};

export default { Query };
