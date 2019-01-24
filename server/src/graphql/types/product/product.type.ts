import { ProductResolvers } from '../../resolvers.types';

export const Product: ProductResolvers.Type = {
  ...ProductResolvers.defaultResolvers,

  owner: async (parent, args, ctx) => {
    return (
      (await ctx.db.product({ id: parent.id }).organization()) ||
      (await ctx.db.product({ id: parent.id }).user())
    );
  },

  issues: (parent, args, ctx) => {
    return ctx.db.product({ id: parent.id }).issues();
  }
};

export default Product;
