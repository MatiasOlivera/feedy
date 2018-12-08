const objection = require('objection');
const { knex } = require('../../../../../services/db.service');
const { ProductOwner, User } = require('../../../../../models');

const deleteUser = async (root, args) => {
  let user;

  try {
    user = await User.query().findById(args.id);

    if (!user)
      return {
        operation: { status: false, message: 'The user does not exists' },
        user: null
      };
  } catch (err) {
    throw err;
  }

  const tsx = await objection.transaction.start(knex);
  try {
    await ProductOwner.query(tsx).deleteById(args.id);
    await User.query(tsx).deleteById(args.id);
    await tsx.commit();

    user = await User.query().findById(args.id);

    return {
      operation: { status: true, message: 'The user was deleted succesfully' },
      user
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

module.exports = { Mutation: { deleteUser } };
