import { IssueOrderByInput, IssueWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getDeletedArgument } from '../../utils/filter.deleted';
import { getPaginationArguments } from '../../utils/pagination';
import { getSortingArguments } from '../../utils/sorting';

const issue: QueryResolvers.IssueResolver = (parent, args, ctx) => {
  return ctx.db.issue({ id: args.id });
};

const issues: QueryResolvers.IssuesResolver = async (parent, args, ctx) => {
  try {
    var pagination = getPaginationArguments(args.pagination);
  } catch (err) {
    throw err;
  }

  const search = args.search
    ? { OR: [{ title_contains: args.search }, { body_contains: args.search }] }
    : null;
  const deleted = getDeletedArgument(args.where.deleted);
  const where: IssueWhereInput = { ...search, ...deleted };
  const orderBy: IssueOrderByInput = getSortingArguments(args.orderBy);

  const result = await ctx.db.issuesConnection({
    ...pagination,
    where,
    orderBy
  });

  const total: number = await ctx.db
    .issuesConnection({ where: { ...deleted } })
    .aggregate()
    .count();

  const count: number = await ctx.db
    .issuesConnection({ where })
    .aggregate()
    .count();

  return { ...result, count, total };
};

export default { issue, issues };
