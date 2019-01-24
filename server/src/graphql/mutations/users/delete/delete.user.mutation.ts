import { MutationResolvers } from '../../../resolvers.types';

const deleteUser: MutationResolvers.DeleteUserResolver = async (
  parent,
  args,
  ctx
) => {
  try {
    const userExists = await ctx.db.$exists.user({ id: args.id });

    if (!userExists) {
      return {
        operation: {
          status: false,
          message: 'The user does not exists'
        },
        user: null
      };
    }
  } catch (err) {
    throw err;
  }

  try {
    const user = await ctx.db.updateUser({
      data: { deletedAt: new Date() },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The user was deleted succesfully'
      },
      user
    };
  } catch (err) {
    throw err;
  }
};

export default deleteUser;
