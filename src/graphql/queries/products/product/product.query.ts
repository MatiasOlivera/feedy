import { Product } from '../../../../models';

const productQuery = async (root: any, args: any): Promise<any> => {
  try {
    const { id } = args;
    return await Product.query().findById(id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { product: productQuery } };
