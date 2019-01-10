import { IssueWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';

const issue: QueryResolvers.IssueResolver = (parent, args, ctx) => {
  return ctx.db.issue({ id: args.id });
};

const issues: QueryResolvers.IssuesResolver = (parent, args, ctx) => {
  const { search } = args;

  const where: IssueWhereInput = search
    ? { OR: [{ title_contains: search }, { body_contains: search }] }
    : {};

  return ctx.db.issues({
    where
  });
};

export default { Query: { issue, issues } };
