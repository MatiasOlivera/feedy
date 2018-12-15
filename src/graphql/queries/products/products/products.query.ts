import { Product } from '../../../../models';
import paginate from '../../_utils/pagination';
import { IProduct, IPagination } from 'graphql-schema';

const productsQuery = async (
  root: undefined,
  args: IPagination
): Promise<IProduct[]> => {
  try {
    return await paginate(Product, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { products: productsQuery } };
