import { Comment } from '../../../../models';
import paginate from '../../_utils/pagination';
import { IPagination, IComment } from 'graphql-schema';

const commentsQuery = async (
  root: undefined,
  args: IPagination
): Promise<IComment[]> => {
  try {
    return await paginate(Comment, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { comments: commentsQuery } };
