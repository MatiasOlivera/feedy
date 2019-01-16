import gql from 'gql-tag';

import { CommentOrderByInput } from '../../../database/prisma-client';
import { Connection } from '../../models.types';
import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../../utils/pagination';
import { getSortingArguments } from '../../utils/sorting';

const comment: QueryResolvers.CommentResolver = (parent, args, ctx) => {
  return ctx.db.comment({ id: args.id });
};

const comments: QueryResolvers.CommentsResolver = async (parent, args, ctx) => {
  try {
    var pagination = getPaginationArguments(args.pagination);
  } catch (err) {
    throw err;
  }

  const orderBy: CommentOrderByInput = getSortingArguments(args.orderBy);

  const deleted = args.where.deleted ? 'deletedAt_not' : 'deletedAt';

  const query = gql`
    query getComments(
      $first: Int
      $after: String
      $last: Int
      $before: String
      $orderBy: CommentOrderByInput
      $deletedAt: DateTime
    ) {
      commentsConnection(
        first: $first
        after: $after
        last: $last
        before: $before
        orderBy: $orderBy
        where: { ${deleted}: $deletedAt }
      ) {
        edges {
          cursor
          node {
            id
            body
            createdAt
            updatedAt
            deletedAt
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        aggregate {
          count
        }
      }
    }
  `;
  const variables = { ...pagination, orderBy, deletedAt: null as null };

  const response = await ctx.client.request<QueryResponse>(query, variables);

  return {
    edges: response.commentsConnection.edges,
    pageInfo: response.commentsConnection.pageInfo,
    total: response.commentsConnection.aggregate.count
  };
};

export interface QueryResponse {
  commentsConnection: Connection<Comment>;
}

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export default { Query: { comment, comments } };
