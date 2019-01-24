import { CreateUserValidator } from '../../../../app/validators';
import { MutationResolvers } from '../../../resolvers.types';

const createUser: MutationResolvers.CreateUserResolver = async (
  parent,
  args,
  ctx
) => {
  const { user } = args;

  try {
    const validator = new CreateUserValidator(user);
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
    // The password confirmation field will not be saved in the database
    const { passwordConfirmation, ...dbUser } = user;
    const newUser = await ctx.db.createUser(dbUser);

    return {
      operation: { status: true, message: 'The user was created succesfully' },
      user: newUser,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

export default createUser;
