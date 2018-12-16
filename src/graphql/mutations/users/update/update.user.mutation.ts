import { UpdateUserValidator } from '../../../../app/validators';
import { User } from '../../../../models';
import { IUserPayload } from 'graphql-schema';

const updateUser = async (
  root: undefined,
  args: any
): Promise<IUserPayload> => {
  let user;
  try {
    user = await User.query().findById(args.id);

    if (!user) {
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
    const inputUser = { id: args.id, ...args.user };
    const validator = new UpdateUserValidator(inputUser);
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
    const updatedUser = await user.$query().patchAndFetch(args.user);

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
