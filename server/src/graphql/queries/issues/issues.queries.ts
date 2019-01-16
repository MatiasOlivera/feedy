import gql from 'gql-tag';

import { IssueOrderByInput } from '../../../database/prisma-client';
import { Connection } from '../../models.types';
import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../../utils/pagination';
import { getSortingArguments } from '../../utils/sorting';

const issue: QueryResolvers.IssueResolver = (parent, args, ctx) => {
  return ctx.db.issue({ id: args.id });
};

const issues: QueryResolvers.IssuesResolver = async (parent, args, ctx) => {
  try {
    var pagination = getPaginationArguments(args.pagination);
  } catch (err) {
    throw err;
  }

  const orderBy: IssueOrderByInput = getSortingArguments(args.orderBy);
  const deleted = args.where.deleted ? 'deletedAt_not' : 'deletedAt';

  const query = gql`
    query getIssues(
      $search: String
      $first: Int
      $after: String
      $last: Int
      $before: String
      $orderBy: IssueOrderByInput
      $deletedAt: DateTime
    ) {
      issuesConnection(
        first: $first
        after: $after
        last: $last
        before: $before
        where: {
          OR: [{ title_contains: $search }, { body_contains: $search }]
          ${deleted}: $deletedAt
        }
        orderBy: $orderBy
      ) {
        edges {
          cursor
          node {
            id
            title
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
  const variables = {
    ...pagination,
    orderBy,
    search: args.search,
    deletedAt: null as null
  };

  const response = await ctx.client.request<QueryResponse>(query, variables);

  return {
    edges: response.issuesConnection.edges,
    pageInfo: response.issuesConnection.pageInfo,
    total: response.issuesConnection.aggregate.count
  };
};

export interface QueryResponse {
  issuesConnection: Connection<Issue>;
}

export interface Issue {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export default { Query: { issue, issues } };
