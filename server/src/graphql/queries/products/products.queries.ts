import { QueryResolvers } from '../../resolvers.types';

const Query: QueryResolvers.Type = {
  product: (parent, args, ctx) => {
    return ctx.db.product({ id: args.id });
  },

  products: (parent, args, ctx) => {
    return ctx.db.products();
  }
};

export default { Query };