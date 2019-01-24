import { CommentResolvers } from '../../resolvers.types';

const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  author: (parent, args, ctx) => {
    return ctx.db.comment({ id: parent.id }).author();
  },

  issue: (parent, args, ctx) => {
    return ctx.db.comment({ id: parent.id }).issue();
  },

  parent: (parent, args, ctx) => {
    return ctx.db.comment({ id: parent.id }).parent();
  },

  children: (parent, args, ctx) => {
    return ctx.db.comment({ id: parent.id }).children();
  }
};

export default Comment;
