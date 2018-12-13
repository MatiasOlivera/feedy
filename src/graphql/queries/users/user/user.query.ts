import { User } from '../../../../models';

const userQuery = async (root: any, args: any): Promise<any> => {
  try {
    const { id } = args;
    return await User.query().findById(id);
  } catch (err) {
    throw err;
  }
};

export default { Query: { user: userQuery } };
