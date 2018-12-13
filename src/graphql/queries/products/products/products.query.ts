import { Product } from '../../../../models';
import paginate from '../../_utils/pagination';

const productsQuery = async (root: any, args: any): Promise<any> => {
  try {
    return await paginate(Product, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { products: productsQuery } };
