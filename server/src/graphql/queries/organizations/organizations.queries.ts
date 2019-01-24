import { OrganizationWhereInput } from '../../../database/prisma-client';
import { OrganizationOrderByInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getDeletedArgument } from '../../utils/filter.deleted';
import { getPaginationArguments } from '../../utils/pagination';
import { getSortingArguments } from '../../utils/sorting';

const organization: QueryResolvers.OrganizationResolver = (
  parent,
  args,
  ctx
) => {
  return ctx.db.organization({ id: args.id });
};

const organizations: QueryResolvers.OrganizationsResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    var pagination = getPaginationArguments(args.pagination);
  } catch (err) {
    throw err;
  }

  const search = args.search ? { name_contains: args.search } : null;
  const deleted = getDeletedArgument(args.where.deleted);
  const where: OrganizationWhereInput = { ...search, ...deleted };
  const orderBy: OrganizationOrderByInput = getSortingArguments(args.orderBy);

  const result = await ctx.db.organizationsConnection({
    ...pagination,
    where,
    orderBy
  });

  const total: number = await ctx.db
    .organizationsConnection({ where: { ...deleted } })
    .aggregate()
    .count();

  const count: number = await ctx.db
    .organizationsConnection({ where })
    .aggregate()
    .count();

  return { ...result, count, total };
};

export default { organization, organizations };
