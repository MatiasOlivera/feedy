import { MutationResolvers } from '../../../resolvers.types';

const restoreProduct: MutationResolvers.RestoreProductResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const productExists = await ctx.db.$exists.product({ id: args.id });

    if (!productExists)
      return {
        operation: {
          status: false,
          message: 'The product does not exists'
        },
        product: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const product = await ctx.db.updateProduct({
      data: { deletedAt: null },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The product was restored succesfully'
      },
      product
    };
  } catch (err) {
    throw err;
  }
};

export default restoreProduct;
