import { ProductOrderByInput, ProductWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getDeletedArgument } from '../../utils/filter.deleted';
import { getPaginationArguments } from '../../utils/pagination';
import { getSortingArguments } from '../../utils/sorting';

const product: QueryResolvers.ProductResolver = (parent, args, ctx) => {
  return ctx.db.product({ id: args.id });
};

const products: QueryResolvers.ProductsResolver = async (parent, args, ctx) => {
  try {
    var pagination = getPaginationArguments(args.pagination);
  } catch (err) {
    throw err;
  }

  const search = args.search ? { name_contains: args.search } : null;
  const deleted = getDeletedArgument(args.where.deleted);
  const where: ProductWhereInput = { ...search, ...deleted };
  const orderBy: ProductOrderByInput = getSortingArguments(args.orderBy);

  const result = await ctx.db.productsConnection({
    ...pagination,
    where,
    orderBy
  });

  const total: number = await ctx.db
    .productsConnection({ where: { ...deleted } })
    .aggregate()
    .count();

  const count: number = await ctx.db
    .productsConnection({ where })
    .aggregate()
    .count();

  return { ...result, count, total };
};

export default { product, products };
