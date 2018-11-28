const objection = require('objection');
const { CreateUserValidator } = require('../../app/validators');
const { knex } = require('../../services/db.service');
const { ProductOwner } = require('../../models');

const createUser = async (root, args) => {
  const { user } = args;

  try {
    const validator = new CreateUserValidator();
    await validator.validate(user);
  } catch (errors) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      user: null,
      errors
    };
  }

  const tsx = await objection.transaction.start(knex);
  try {
    // ER_BAD_FIELD_ERROR: Unknown column 'password_confirmation' in 'field list'
    delete user.passwordConfirmation;

    const newProductOwner = await ProductOwner.query(tsx).insert({});
    const newUser = await newProductOwner
      .$relatedQuery('user', tsx)
      .insertAndFetch(user);

    await tsx.commit();

    return {
      operation: { status: true, message: 'The user was created succesfully' },
      user: newUser,
      errors: null
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

module.exports = {
  createUser
};
