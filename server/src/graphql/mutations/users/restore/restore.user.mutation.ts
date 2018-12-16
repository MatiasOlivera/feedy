import objection from 'objection';
import { knex } from '../../../../services/db.service';
import { ProductOwner, User } from '../../../../models';
import { IUserSimplePayload } from 'graphql-schema';

const restoreUser = async (
  root: undefined,
  args: { id: string }
): Promise<IUserSimplePayload> => {
  try {
    const user = await User.query().findById(args.id);

    if (!user) {
      return {
        operation: {
          status: false,
          message: 'The user does not exists'
        },
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

    return {
      operation: {
        status: true,
        message: 'The user was restored succesfully'
      },
      user
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { restoreUser } };
