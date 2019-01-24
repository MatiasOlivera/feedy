import { UpdateProductValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const updateProduct: MutationResolvers.UpdateProductResolver = async (
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
        product: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const inputProduct = { id: args.id, ...args.product };
    const validator = new UpdateProductValidator(inputProduct);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      product: null,
      errors: err
    };
  }

  try {
    const updatedProduct = await ctx.db.updateProduct({
      data: args.product,
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The product was updated succesfully'
      },
      product: updatedProduct,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default updateProduct;
