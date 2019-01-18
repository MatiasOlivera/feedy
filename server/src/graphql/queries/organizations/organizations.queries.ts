import { OrganizationWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../../utils/pagination';

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

  const where: OrganizationWhereInput = args.search
    ? { OR: [{ name_contains: args.search }] }
    : null;

  const result = await ctx.db.organizationsConnection({
    ...pagination,
    where
  });

  const total: number = await ctx.db
    .organizationsConnection()
    .aggregate()
    .count();

  const count: number = where
    ? await ctx.db
        .organizationsConnection({ where })
        .aggregate()
        .count()
    : total;

  return { ...result, count, total };
};

export default { Query: { organization, organizations } };
