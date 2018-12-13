import objection from 'objection';
import { knex } from '../../../../services/db.service';
import { ProductOwner, User } from '../../../../models';

const deleteUser = async (root: any, args: any): Promise<any> => {
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

export default { Mutation: { deleteUser } };
