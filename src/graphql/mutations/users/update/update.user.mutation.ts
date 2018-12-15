import { UpdateUserValidator } from '../../../../app/validators';
import { User } from '../../../../models';
import { IOperation } from 'graphql-schema';

const updateUser = async (root: undefined, args: any): Promise<any> => {
  let user;
  try {
    user = await User.query().findById(args.id);

    if (!user) {
      const operation: IOperation = {
        status: false,
        message: 'The user does not exists'
      };

      return {
        operation,
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
    const operation: IOperation = {
      status: false,
      message: 'There are validation errors'
    };

    return {
      operation,
      user: null,
      errors: err
    };
  }

  try {
    const updatedUser = await user.$query().patchAndFetch(args.user);

    const operation: IOperation = {
      status: true,
      message: 'The user was updated succesfully'
    };

    return {
      operation,
      user: updatedUser,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default { Mutation: { updateUser } };
