import { Comment } from '../../../../models';
import paginate from '../../_utils/pagination';

const commentsQuery = async (root: any, args: any): Promise<any> => {
  try {
    return await paginate(Comment, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { comments: commentsQuery } };
