import objection from 'objection';
import { CreateOrganizationValidator } from '../../../../app/validators';
import { knex } from '../../../../services/db.service';
import { ProductOwner } from '../../../../models';
import { IOrganizationPayload } from 'graphql-schema';

const createOrganization = async (
  root: undefined,
  args: any
): Promise<IOrganizationPayload> => {
  const { org } = args;

  try {
    const validator = new CreateOrganizationValidator(org);
    await validator.validate();
  } catch (err) {
    return {
      operation: {
        status: false,
        message: 'There are validation errors'
      },
      organization: null,
      errors: err
    };
  }

  const tsx = await objection.transaction.start(knex);
  try {
    const newProductOwner = await ProductOwner.query(tsx).insert({});
    const newOrg = await newProductOwner
      .$relatedQuery('organization', tsx)
      .insertAndFetch(org);

    await tsx.commit();

    return {
      operation: {
        status: true,
        message: 'The organization was created succesfully'
      },
      organization: newOrg,
      errors: null
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { createOrganization } };
