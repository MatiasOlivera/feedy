import { UserOrderByInput, UserWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../../utils/pagination';
import { getSortingArguments } from '../../utils/sorting';

const user: QueryResolvers.UserResolver = (parent, args, ctx) => {
  return ctx.db.user({ id: args.id });
};

const users: QueryResolvers.UsersResolver = async (parent, args, ctx) => {
  try {
    var pagination = getPaginationArguments(args.pagination);
  } catch (err) {
    throw err;
  }

  const search = args.search ? { username_contains: args.search } : null;
  const where: UserWhereInput = { ...search };
  const orderBy: UserOrderByInput = getSortingArguments(args.orderBy);

  const result = await ctx.db.usersConnection({
    ...pagination,
    where,
    orderBy
  });

  const total: number = await ctx.db
    .usersConnection()
    .aggregate()
    .count();

  const count: number = await ctx.db
    .usersConnection({ where })
    .aggregate()
    .count();

  return { ...result, count, total };
};

export default { Query: { user, users } };
