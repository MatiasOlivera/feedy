import { CommentOrderByInput, CommentWhereInput } from '../../../database/prisma-client';
import { QueryResolvers } from '../../resolvers.types';
import { getDeletedArgument } from '../../utils/filter.deleted';
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

  const deleted = getDeletedArgument(args.where.deleted);
  const where: CommentWhereInput = { ...deleted };
  const orderBy: CommentOrderByInput = getSortingArguments(args.orderBy);

  const result = await ctx.db.commentsConnection({
    ...pagination,
    where,
    orderBy
  });

  const total: number = await ctx.db
    .commentsConnection({ where: { ...deleted } })
    .aggregate()
    .count();

  const count: number = await ctx.db
    .commentsConnection({ where })
    .aggregate()
    .count();

  return { ...result, count, total };
};

export default { Query: { comment, comments } };
