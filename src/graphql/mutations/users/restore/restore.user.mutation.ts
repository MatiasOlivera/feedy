import objection from 'objection';
import { knex } from '../../../../services/db.service';
import { ProductOwner, User } from '../../../../models';
import { IOperation } from 'graphql-schema';

const restoreUser = async (root: undefined, args: any): Promise<any> => {
  try {
    const user = await User.query().findById(args.id);

    if (!user) {
      const operation: IOperation = {
        status: false,
        message: 'The user does not exists'
      };

      return {
        operation,
        user: null
      };
    }
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

    const operation: IOperation = {
      status: true,
      message: 'The user was restored succesfully'
    };

    return {
      operation,
      user
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { restoreUser } };
