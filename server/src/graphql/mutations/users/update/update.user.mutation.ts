import { UpdateUserValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const updateUser: MutationResolvers.UpdateUserResolver = async (
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
        user: null,
        errors: null
      };
    }
  } catch (err) {
    throw err;
  }

  try {
    const validator = new UpdateUserValidator(args.user, { id: args.id });
    await validator.validate();
  } catch (err) {
    return {
      operation: {
        status: false,
        message: 'There are validation errors'
      },
      user: null,
      errors: err
    };
  }

  try {
    const updatedUser = await ctx.db.updateUser({
      data: args.user,
      where: { id: args.id }
    });

    return {
      operation: {
        status: true,
        message: 'The user was updated succesfully'
      },
      user: updatedUser,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { updateUser } };
