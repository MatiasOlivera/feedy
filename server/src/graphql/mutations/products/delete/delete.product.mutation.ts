import { MutationResolvers } from '../../../resolvers.types';

const deleteProduct: MutationResolvers.DeleteProductResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const productExists = await ctx.db.$exists.product({ id: args.id });

    if (!productExists)
      return {
        operation: { status: false, message: 'The product does not exists' },
        product: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const product = await ctx.db.updateProduct({
      data: { deletedAt: new Date() },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The product was deleted succesfully'
      },
      product
    };
  } catch (err) {
    throw err;
  }
};

export default deleteProduct;
