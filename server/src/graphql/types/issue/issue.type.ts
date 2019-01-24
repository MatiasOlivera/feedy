import { IssueResolvers } from '../../resolvers.types';

const Issue: IssueResolvers.Type = {
  ...IssueResolvers.defaultResolvers,

  author: (parent, args, ctx) => {
    return ctx.db.issue({ id: parent.id }).author();
  },

  product: (parent, args, ctx) => {
    return ctx.db.issue({ id: parent.id }).product();
  },

  comments: (parent, args, ctx) => {
    return ctx.db.issue({ id: parent.id }).comments();
  }
};

export default Issue;
