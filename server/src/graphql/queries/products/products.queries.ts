import { ProductWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../../utils/pagination';

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
  const where: ProductWhereInput = { ...search };

  const result = await ctx.db.productsConnection({
    ...pagination,
    where
  });

  const total: number = await ctx.db
    .productsConnection()
    .aggregate()
    .count();

  const count: number = await ctx.db
    .productsConnection({ where })
    .aggregate()
    .count();

  return { ...result, count, total };
};

export default { Query: { product, products } };
