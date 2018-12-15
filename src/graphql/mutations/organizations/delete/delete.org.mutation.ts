import objection from 'objection';
import { knex } from '../../../../services/db.service';
import { ProductOwner, Organization } from '../../../../models';
import { IOrganizationSimplePayload } from 'graphql-schema';

const deleteOrganization = async (
  root: undefined,
  args: { id: string }
): Promise<IOrganizationSimplePayload> => {
  let org;
  try {
    org = await Organization.query().findById(args.id);

    if (!org) {
      return {
        operation: {
          status: false,
          message: 'The organization does not exists'
        },
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

    return {
      operation: {
        status: true,
        message: 'The organization was deleted succesfully'
      },
      organization: org
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { deleteOrganization } };
