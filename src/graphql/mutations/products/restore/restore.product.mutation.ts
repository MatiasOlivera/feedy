import { Product } from '../../../../models';
import { IProductSimplePayload } from 'graphql-schema';

const restoreProduct = async (
  root: undefined,
  args: { id: string }
): Promise<IProductSimplePayload> => {
  try {
    const product = await Product.query().findById(args.id);

    if (!product)
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
    await Product.query()
      .where('id', args.id)
      .restore();

    const product = await Product.query().findById(args.id);

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

export default { Mutation: { restoreProduct } };
