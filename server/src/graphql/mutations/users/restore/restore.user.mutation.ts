import { MutationResolvers } from '../../../resolvers.types';

const restoreUser: MutationResolvers.RestoreUserResolver = async (
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
      data: { deletedAt: null },
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The user was restored succesfully'
      },
      user
    };
  } catch (err) {
    throw err;
  }
};

export default restoreUser;
