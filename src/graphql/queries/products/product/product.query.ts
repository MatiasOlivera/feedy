import { Product } from '../../../../models';
import { IProduct } from 'graphql-schema';

const productQuery = async (
  root: undefined,
  args: { id: string }
): Promise<IProduct> => {
  try {
    return await Product.query().findById(args.id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { product: productQuery } };
