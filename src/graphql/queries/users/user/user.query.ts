import { User } from '../../../../models';
import { IUser } from 'graphql-schema';

const userQuery = async (
  root: undefined,
  args: { id: string }
): Promise<IUser> => {
  try {
    return await User.query().findById(args.id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { user: userQuery } };
