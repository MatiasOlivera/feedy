import { QueryResolvers } from '../../resolvers.types';

const comment: QueryResolvers.CommentResolver = (parent, args, ctx) => {
  return ctx.db.comment({ id: args.id });
};

const comments: QueryResolvers.CommentsResolver = (parent, args, ctx) => {
  return ctx.db.comments();
};

export default { Query: { comment, comments } };
