import objection from 'objection';
import { knex } from '../../../../services/db.service';
import { ProductOwner, Organization } from '../../../../models';
import { IOperation } from 'graphql-schema';

const deleteOrganization = async (root: undefined, args: any): Promise<any> => {
  let org;
  try {
    org = await Organization.query().findById(args.id);

    if (!org) {
      const operation: IOperation = {
        status: false,
        message: 'The organization does not exists'
      };

      return {
        operation,
        organization: null
      };
    }
  } catch (err) {
    throw err;
  }

  const tsx = await objection.transaction.start(knex);
  try {
    await ProductOwner.query(tsx).deleteById(args.id);
    await Organization.query(tsx).deleteById(args.id);
    await tsx.commit();

    org = await Organization.query().findById(args.id);

    const operation: IOperation = {
      status: true,
      message: 'The organization was deleted succesfully'
    };

    return {
      operation,
      organization: org
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { deleteOrganization } };
