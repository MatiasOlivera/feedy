import objection from 'objection';
import { knex } from '../../../../services/db.service';
import { ProductOwner, Organization } from '../../../../models';

const restoreOrganization = async (root: any, args: any): Promise<any> => {
  try {
    const org = await Organization.query().findById(args.id);

    if (!org)
      return {
        operation: {
          status: false,
          message: 'The organization does not exists'
        },
        organization: null
      };
  } catch (err) {
    throw err;
  }

  const tsx = await objection.transaction.start(knex);
  try {
    await ProductOwner.query(tsx)
      .where('id', args.id)
      .restore();

    await Organization.query(tsx)
      .where('id', args.id)
      .restore();

    await tsx.commit();

    const organization = await Organization.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The organization was restored succesfully'
      },
      organization
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { restoreOrganization } };
