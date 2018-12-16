// Type definitions for graphql-errors
// Project: https://github.com/kadirahq/graphql-errors
// Definitions by: Matías Olivera <https://github.com/MatiasOlivera>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'graphql-errors' {
  import { GraphQLSchema } from 'graphql';

  type handlerFunction = (err: Error) => Error;

  export function setDefaultHandler(fn: handlerFunction): void;

  export function maskErrors(schema: GraphQLSchema, fn?: handlerFunction): void;

  export class UserError extends Error {
    constructor(message: string);
  }
}
