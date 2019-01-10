import { ProductWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';

const product: QueryResolvers.ProductResolver = (parent, args, ctx) => {
  return ctx.db.product({ id: args.id });
};

const products: QueryResolvers.ProductsResolver = (parent, args, ctx) => {
  const { search } = args;

  const where: ProductWhereInput = search ? { name_contains: search } : {};

  return ctx.db.products({
    where
  });
};

export default { Query: { product, products } };
