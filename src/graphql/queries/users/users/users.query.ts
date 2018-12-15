import { User } from '../../../../models';
import paginate from '../../_utils/pagination';
import { IPagination, IUser } from 'graphql-schema';

const usersQuery = async (
  root: undefined,
  args: IPagination
): Promise<IUser[]> => {
  try {
    return await paginate(User, args);
  } catch (err) {
    throw err;
  }
};

export default { Query: { users: usersQuery } };
