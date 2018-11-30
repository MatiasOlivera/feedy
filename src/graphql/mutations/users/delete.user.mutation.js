const { User } = require('../../../models');

const deleteUser = async (root, args) => {
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
    await User.query().deleteById(args.id);

    return {
      operation: { status: true, message: 'The user was deleted succesfully' },
      user,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

module.exports = deleteUser;
