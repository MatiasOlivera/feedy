import { CreateProductValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const createProduct: MutationResolvers.CreateProductResolver = async (
  parent,
  args,
  ctx
) => {
  const { product } = args;

  try {
    const validator = new CreateProductValidator(product);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      product: null,
      errors: err
    };
  }

  try {
    const newProduct = await ctx.db.createProduct(product);

    return {
      operation: {
        status: true,
        message: 'The product was created succesfully'
      },
      product: newProduct,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default createProduct;
