import { rawRequest } from 'graphql-request';
import { Variables, GraphQLError } from 'graphql-request/dist/src/types';

const endpoint: string = process.env.VUE_APP_API_ENDPOINT;

interface RawRequestPayload<T> {
  status: number;
  data?: T;
  errors?: GraphQLError[];
}

interface ResponsePayload<T> {
  status: boolean;
  data: T;
}

function getStatus(status: number): boolean {
  return status >= 200 && status <= 208;
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
  const {
    data,
    status: statusCode,
    errors
  }: RawRequestPayload<T> = await rawRequest(url, query, variables);

  const status: boolean = getStatus(statusCode);

  return new Promise((resolve, reject) => {
    if (data) {
      resolve({ status, data });
    }

    if (errors) {
      reject({ status, errors });
    }
  });
}

export default { request };
