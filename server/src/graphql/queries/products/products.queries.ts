import { QueryResolvers } from '../../resolvers.types';

const product: QueryResolvers.ProductResolver = (parent, args, ctx) => {
  return ctx.db.product({ id: args.id });
};

const products: QueryResolvers.ProductsResolver = (parent, args, ctx) => {
  return ctx.db.products();
};

export default { Query: { product, products } };
