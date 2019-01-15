import gql from 'gql-tag';

import { Connection } from '../../models.types';
import { QueryResolvers } from '../../resolvers.types';
import { getPaginationArguments } from '../../utils/pagination';

const issue: QueryResolvers.IssueResolver = (parent, args, ctx) => {
  return ctx.db.issue({ id: args.id });
};

const issues: QueryResolvers.IssuesResolver = async (parent, args, ctx) => {
  try {
    var pagination = getPaginationArguments(args);
  } catch (err) {
    throw err;
  }

  const query = gql`
    query getIssues(
      $search: String
      $first: Int
      $after: String
      $last: Int
      $before: String
    ) {
      issuesConnection(
        first: $first
        after: $after
        last: $last
        before: $before
        where: { OR: [{ title_contains: $search }, { body_contains: $search }] }
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
  const variables = { ...pagination, search: args.search };

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
