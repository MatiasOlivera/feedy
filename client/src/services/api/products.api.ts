import gql from 'gql-tag';
import { request } from './request';
import { Product } from '../../types/products.types';

interface GetProductsResponse {
  status: boolean;
  data: {
    products: Product[];
  };
}

export async function getProducts(): Promise<GetProductsResponse> {
  const query = gql`
    query {
      products {
        id
        name
        description
      }
    }
  `;

  try {
    return await request<{ products: Product[] }>(query);
  } catch (err) {
    throw err;
  }
}

export default { getProducts };
