import gql from 'gql-tag';
import { request, ResponsePayload } from './request';
import { Product } from '../../types/products.types';

export async function getProducts(): Promise<ResponsePayload<Product[]>> {
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
    return await request<Product[]>(query);
  } catch (err) {
    throw err;
  }
}

export default { getProducts };
