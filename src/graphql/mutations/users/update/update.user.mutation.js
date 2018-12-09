const { UpdateUserValidator } = require('../../../../app/validators');
const { User } = require('../../../../models');

const updateUser = async (root, args) => {
  let user;
  try {
    user = await User.query().findById(args.id);

    if (!user)
      return {
        operation: { status: false, message: 'The user does not exists' },
        user: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    const inputUser = { id: args.id, ...args.user };
    const validator = new UpdateUserValidator(inputUser);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      user: null,
      errors: err
    };
  }

  try {
    const updatedUser = await user.$query().patchAndFetch(args.user);

    return {
      operation: { status: true, message: 'The user was updated succesfully' },
      user: updatedUser,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { Mutation: { updateUser } };
