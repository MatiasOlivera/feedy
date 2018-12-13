import { User } from '../../../../models';
import paginate from '../../_utils/pagination';

const usersQuery = async (root: any, args: any): Promise<any> => {
  try {
    return await paginate(User, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { users: usersQuery } };
