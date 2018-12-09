const objection = require('objection');
const { knex } = require('../../../../../services/db.service');
const { ProductOwner, User } = require('../../../../../models');

const restoreUser = async (root, args) => {
  try {
    const user = await User.query().findById(args.id);

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
    await ProductOwner.query(tsx)
      .where('id', args.id)
      .restore();

    await User.query(tsx)
      .where('id', args.id)
      .restore();

    await tsx.commit();

    const user = await User.query().findById(args.id);

    return {
      operation: { status: true, message: 'The user was restored succesfully' },
      user
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

module.exports = { Mutation: { restoreUser } };
