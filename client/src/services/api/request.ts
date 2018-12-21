import { request as GraphQLRequest } from 'graphql-request';
import { Variables, GraphQLResponse } from 'graphql-request/dist/src/types';

const endpoint: string = process.env.VUE_APP_API_ENDPOINT;

export declare interface ResponsePayload<T> {
  status: boolean;
  data: T;
}

/**
 * Make a GraphQL request
 *
 * @export
 * @param query The query or mutation
 * @param [variables] The variables used in the query or mutation
 * @param [url=endpoint] The server endpoint
 * @returns The server response
 */
export async function request<T>(
  query: string,
  variables?: Variables,
  url: string = endpoint
): Promise<ResponsePayload<T>> {
  let response: GraphQLResponse;

  try {
    response = await GraphQLRequest(url, query, variables);
  } catch (err) {
    throw new Error('Request error');
  }

  const status: boolean = getStatus(response.status);

  return new Promise((resolve, reject) => {
    if (response.data) {
      resolve({ status, data: response.data });
    }

    if (response.errors) {
      reject({ status, errors: response.errors });
    }
  });
}

function getStatus(status: number): boolean {
  return status >= 200 && status <= 208;
}

export default { request };
