import { MutationResolvers } from '../../../resolvers.types';
import { CreateProductValidator } from '../../../validators';

const createProduct: MutationResolvers.CreateProductResolver = async (
  parent,
  args,
  ctx
) => {
  const { product } = args;

  try {
    const validator = new CreateProductValidator();
    await validator.validate(product);
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
