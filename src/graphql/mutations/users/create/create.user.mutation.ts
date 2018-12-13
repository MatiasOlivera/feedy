import objection from 'objection';
import { CreateUserValidator } from '../../../../app/validators';
import { knex } from '../../../../services/db.service';
import { ProductOwner } from '../../../../models';

const createUser = async (root: any, args: any): Promise<any> => {
  const { user } = args;

  try {
    const validator = new CreateUserValidator(user);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      user: null,
      errors: err
    };
  }

  const tsx = await objection.transaction.start(knex);
  try {
    // ER_BAD_FIELD_ERROR:
    // Unknown column 'password_confirmation' in 'field list'
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

export default { Mutation: { createUser } };
