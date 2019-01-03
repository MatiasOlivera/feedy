import { QueryResolvers } from '../../resolvers.types';

const issue: QueryResolvers.IssueResolver = (parent, args, ctx) => {
  return ctx.db.issue({ id: args.id });
};

const issues: QueryResolvers.IssuesResolver = (parent, args, ctx) => {
  return ctx.db.issues();
};

export default { Query: { issue, issues } };
