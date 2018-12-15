import objection from 'objection';
import { CreateOrganizationValidator } from '../../../../app/validators';
import { knex } from '../../../../services/db.service';
import { ProductOwner } from '../../../../models';
import { IOperation } from 'graphql-schema';

const createOrganization = async (root: undefined, args: any): Promise<any> => {
  const { org } = args;

  try {
    const validator = new CreateOrganizationValidator(org);
    await validator.validate();
  } catch (err) {
    const operation: IOperation = {
      status: false,
      message: 'There are validation errors'
    };

    return {
      operation,
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

    const operation: IOperation = {
      status: true,
      message: 'The organization was created succesfully'
    };

    return {
      operation,
      organization: newOrg,
      errors: null
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

export default { Mutation: { createOrganization } };
