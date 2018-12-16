import { CreateProductValidator } from '../../../../app/validators';
import { Product } from '../../../../models';
import { IProductPayload } from 'graphql-schema';

const createProduct = async (
  root: undefined,
  args: any
): Promise<IProductPayload> => {
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
    const newProduct = await Product.query().insertAndFetch(product);

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

export default { Mutation: { createProduct } };
